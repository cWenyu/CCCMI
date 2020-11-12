import cv2

# Load the cascade
face_cascade = cv2.CascadeClassifier(r'D:\Desktop\CCCMI\selflearning_tunjing\opencv\haarcascade_frontalface_default.xml')
# Read the input image
imgR = cv2.imread(r'D:\Desktop\CCCMI\selflearning_tunjing\opencv\test.jpg')
img = cv2.resize(imgR, (960, 540))

#Convert into grayscale

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# Detect faces
faces = face_cascade.detectMultiScale(gray, 1.1, 4)
# Draw rectangle around the faces
for (x, y, w, h) in faces:
     cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
# Display the output
cv2.imshow('img', img)
cv2.waitKey()