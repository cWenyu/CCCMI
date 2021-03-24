import time
import torch

import io
from PIL import Image
import cv2
import numpy as np
from base64 import b64decode

from ai_model.darknet import Darknet


def iou_validation(box1, box2):
    # Get the Width and Height of each bounding box
    width_b1 = box1[2]
    height_b1 = box1[3]
    width_b2 = box2[2]
    height_b2 = box2[3]

    # Find the vertical and the Horizontal edges of the union of the two bounding boxes
    # IOU = Area of Intersection/ Area of Union
    min_x = min(box1[0] - width_b1 / 2.0, box2[0] - width_b2 / 2.0)
    max_x = max(box1[0] + width_b1 / 2.0, box2[0] + width_b2 / 2.0)
    min_y = min(box1[1] - height_b1 / 2.0, box2[1] - height_b2 / 2.0)
    max_y = max(box1[1] + height_b1 / 2.0, box2[1] + height_b2 / 2.0)

    # Calculate the width and height of the union of the two bounding boxes
    union_width = max_x - min_x
    union_height = max_y - min_y

    # Calculate the width and height of the area of intersection of the two bounding boxes
    intersection_width = width_b1 + width_b2 - union_width
    intersection_height = height_b1 + height_b2 - union_height

    # If the the boxes don't overlap then their IOU is zero
    if intersection_width <= 0 or intersection_height <= 0:
        return 0.0

    # Calculate the area of intersection of the two bounding boxes
    intersection_area = intersection_width * intersection_height

    # Calculate the area of the each bounding box
    area_box1 = width_b1 * height_b1
    area_box2 = width_b2 * height_b2

    # Calculate the area of the union of the two bounding boxes
    union_area = area_box1 + area_box2 - intersection_area

    # Calculate the IOU
    iou = intersection_area / union_area

    return iou


def nms_validation(boxes, iou_thresh):
    # If there are no bounding boxes do nothing
    if len(boxes) == 0:
        return boxes

    # Create a PyTorch Tensor to keep track of the detection confidence of each predicted bounding box
    detect_conf = torch.zeros(len(boxes))

    # Get the detection confidence of each predicted bounding box
    for i in range(len(boxes)):
        detect_conf[i] = boxes[i][4]

    # Sort the indices of the bounding boxes by detection confidence.
    _, sort_id = torch.sort(detect_conf, descending=True)

    # Create an empty list to store the best bounding boxes after Non-Maximal Suppression (NMS) is performed
    best_box = []

    # Perform NMS
    for i in range(len(boxes)):

        # Get the bounding box with the highest detection confidence first
        box_i = boxes[sort_id[i]]

        # Check that the detection confidence is not zero
        if box_i[4] > 0:

            # Save the bounding box
            best_box.append(box_i)
            # Go through the rest of the bounding boxes in the list and
            # calculate their IOU with respect to the previous selected box_i.
            for j in range(i + 1, len(boxes)):
                box_j = boxes[sort_id[j]]

                # If the IOU of box_i and box_j is higher than the given IOU
                # threshold set box_j's detection confidence to zero.
                if iou_validation(box_i, box_j) > iou_thresh:
                    box_j[4] = 0

    return best_box


def detect_objects(model, img, iou_thresh, nms_thresh):
    # Start the time. This is done to calculate how long the detection takes.
    start = time.time()

    # Set the Darknet model to evaluation mode.
    model.eval()

    # Convert the image from a NumPy ndarray to a PyTorch Tensor with the correct shape.
    # The image is transposed, then converted to a FloatTensor of dtype float32.
    # It is then Normalized to values between 0 and 1 by dividing with 255.0
    # finally unsqueezed to have the correct shape of (1 x 3 x width x height)
    img = torch.from_numpy(img.transpose(2, 0, 1)).float().div(255.0).unsqueeze(0)

    # Feed the image to the Darknet neural network model with the corresponding NMS threshold.
    # NMS is used to remove all bounding boxes that have a very low probability of detection.
    # All predicted bounding boxes with a value less than the given NMS threshold will be removed.
    list_boxes = model(img, nms_thresh)

    # Create a new list with all the bounding boxes that are returned by the neural network
    boxes = list_boxes[0][0] + list_boxes[1][0] + list_boxes[2][0]

    # Now we perform NMS on the bounding boxes returned by the neural network.
    # Here, we keep the best bounding boxes and eliminate all the bounding boxes
    # whose IOU value is higher than the given IOU threshold
    boxes = nms_validation(boxes, iou_thresh)
    # Stop the time.
    finish = time.time()

    # Total time taken to detect all the objects
    time_taken = round(finish - start)

    # Print the time it took to detect objects
    print('\n\nIt took {}'.format(time_taken), 'seconds to detect the objects in the image.\n')

    # Print the number of objects detected
    print('Total Number of Objects Detected:', len(boxes), '\n')

    return boxes, time_taken


def load_class_names(names):
    # Create an empty list to hold the object classes
    class_names = []

    # Open the file containing the COCO object classes in read-only mode
    # The coco.names file contains only one object class per line.
    # Read the file line by line and save all the lines in a list.
    with open(names, 'r') as fp:
        lines = fp.readlines()

    # Get the object class names
    # Take the name in each line any remove any whitespaces
    # Append the object class name into class_names
    for name in lines:
        line = name.rstrip()
        class_names.append(line)
    return class_names


# creates json object, takes boxes and class_names as param
def create_json_object(original_image, boxes, class_names):
    result = {}
    count = 0
    result['detected_image'] = False
    tail_present, smaller_tail, tail_count = tail_found(original_image, boxes, class_names)

    # loops through the bounding boxes
    for i in range(len(boxes)):
        box = boxes[i]

        if len(box) >= 7 and class_names:
            cls_conf = box[5]
            cls_id = box[6]
            #  got from tail_found method used in json response
            result["tail_present"] = tail_present
            result["smaller_tail"] = smaller_tail
            result["tail_count"] = tail_count

            # if class name tail is not present add the count and add the resulting data for insect
            if class_names[cls_id] != "Tail":
                count += 1
                result['detected_image'] = True
                result["class_label"] = class_names[cls_id]
                result["confidence"] = cls_conf.item()
                result["predicted_count"] = count

    return result


# gets data for tails length and count
def tail_found(img, boxes, class_names):
    insect_in_group_2 = ['Perla', 'Amphinemura', 'Leuctra', 'Protonemura', 'Isoperia']
    # Get the width and height of the image
    width = img.shape[1]
    height = img.shape[0]
    tail_count = 0
    class_names_list = []
    tail_length = []
    smaller_tail = False
    tail_present = False
    smallest_tail = 0
    largest_tail = 0

    # loops through the bounding boxes
    for i in range(len(boxes)):

        # Get each bounding box
        box = boxes[i]

        # Get the (x,y) pixel coordinates of the upper-left and upper-right corners of the bounding box
        x1 = int(np.around((box[0] - box[2] / 2.0) * width))
        y1 = int(np.around((box[1] - box[3] / 2.0) * height))
        x2 = int(np.around((box[0] + box[2] / 2.0) * width))
        y2 = int(np.around((box[1] + box[3] / 2.0) * height))

        # fills the class names insect and tail
        if len(box) >= 7 and class_names:
            cls_id = box[6]
            class_names_list.append(class_names[cls_id])

        # contains only tail not insect using classes added when present do calculations
        if class_names[cls_id] == "Tail":
            tail_present = True
            tail_count += 1
            # gets width x and width y used for length
            width_x = x2 - x1
            width_y = abs(y1 - y2)
            # gets max out of all, biggest number is the length, smallest number is width of tail
            length = max(width_x, width_y)
            tail_length.append(length)

            # gets 3 or 2 numbers in list depending on amount of tails, gets largest and smallest out of all
            largest_tail = max(tail_length)
            smallest_tail = min(tail_length)

        # checks if class names list contains any name in group 2 insect names
        check = any(item in class_names_list for item in insect_in_group_2)

        # if so the it has 2 tails so smaller tail doesnt apply
        if check:
            smaller_tail = False
        # else if the largest tail smallest tail do not equal then there is a small tail present
        elif largest_tail != smallest_tail and not check:
            smaller_tail = True

    return tail_present, smaller_tail, tail_count


# image processing and returns detection results, request type POST
def process_image_post(api_request):
    # gets image from POST which is encoded into base64 string
    base64_data = api_request.POST.get("image64", None)
    # decodes image64 and gives byte data
    data = b64decode(base64_data)
    # read the entire image byte gives bytes needed and put into array
    data = np.array(Image.open(io.BytesIO(data)))
    # send image bytes to get detected time
    result, detection_time = run_detection(data)
    # return detection result and detection time
    return result, detection_time


# image processing and returns detection results, request type FILES
def process_image_files(api_request):
    image_api_request = api_request.FILES["image"]
    image_bytes = image_api_request.read()
    image = Image.open(io.BytesIO(image_bytes))
    result, detection_time = run_detection(image)
    return result, detection_time


# add time and result to json object
def json_obj(json_object, detect_time, obj):
    json_object['time'] = detect_time
    json_object['object'] = obj
    # return detection result and detection time
    return json_object['time'], json_object['object']


# runs the detection code, takes in image byte stream array
def run_detection(original_image):
    # gets cfg weights and class names in dir
    cfg_file = './ai_model/cfg/yolov3.cfg'
    weight_file = './ai_model/weights/yolov3.weights'
    names = './ai_model/data/class.names'
    # darknet uses cfg file set up for 6 classes
    m = Darknet(cfg_file)
    # darknet uses weight file trained on bounding boxes
    m.load_weights(weight_file)
    # class names are extracted and set to variable, load_class_names within utils file
    class_names = load_class_names(names)
    # resize image to suite darknet cfg height and width
    resized_image = cv2.resize(np.float32(original_image), (m.width, m.height))
    # Overlap higher means more overlap is allowed
    nms_thresh = 0.3
    # Intersection over Union, 0.5 was closest to the bounding boxes placed on
    # images after changes to classes and dimensions in cfg
    iou_thresh = 0.5
    # process the detection with set values
    boxes, detection_time = detect_objects(m, resized_image, iou_thresh, nms_thresh)
    # creates json object from results
    objects = create_json_object(resized_image, boxes, class_names)
    # return json object and time taken to detect insect
    return objects, detection_time
