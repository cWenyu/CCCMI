insect_in_group_1 = ['Ecdyonurus', 'Rhithrogena semicolorata', 'Heptagenia', 'Ephemera Danica', 'Serratella Ignita',
                     'Caenis']
insect_in_group_2 = ['Perla', 'Amphinemura', 'Leuctra', 'Protonemura', 'Isoperia']
insect_in_group_3 = ['Hydropsychide', 'Rhyacophlia', 'Hydroptilldae', 'Polycentropidae', 'Sericostomatidae', 'Goeridae',
                     'Limnephilldae']
insect_in_group_4 = ['Planorbis', 'Lymnaea', 'Potamopyrgus', 'Lumbriculidae', 'Eiseniella', 'Naididae', 'Simulidae',
                     'Dicranota', 'Chironomus', 'Flatworms', 'Leeches']
insect_in_group_5 = ['Asellus']


def count_score_by_insect(dict_of_insect):
    result = {}
    dictionary = {}
    for key in dict_of_insect:
        dictionary[key["insect_name"]] = relative_abundance_calculate(key['amount'])

    dict_for_insect_group_1 = extract_dict_using_keylist(dictionary, insect_in_group_1)
    dict_for_insect_group_2 = extract_dict_using_keylist(dictionary, insect_in_group_2)
    dict_for_insect_group_3 = extract_dict_using_keylist(dictionary, insect_in_group_3)
    dict_for_insect_group_4 = extract_dict_using_keylist(dictionary, insect_in_group_4)
    dict_for_insect_group_5 = extract_dict_using_keylist(dictionary, insect_in_group_5)

    num_of_type1, total1 = calculate_type_and_relative_abundance(dict_for_insect_group_1)
    num_of_type2, total2 = calculate_type_and_relative_abundance(dict_for_insect_group_2)
    num_of_type3, total3 = calculate_type_and_relative_abundance(dict_for_insect_group_3)
    num_of_type4, total4 = calculate_type_and_relative_abundance(dict_for_insect_group_4)
    num_of_type5, total5 = calculate_type_and_relative_abundance(dict_for_insect_group_5)

    total = 0
    total += calculate_group_1(num_of_type1, total1)
    total += calculate_group_2(num_of_type2, total2)
    total += calculate_group_3(num_of_type3, total3)
    total += calculate_group_4(num_of_type4, total4)
    total += calculate_group_5(total5)

    result["score"] = total

    return result


def relative_abundance_calculate(estimate_number):
    if estimate_number < 0:
        return 'Error'
    elif estimate_number == 0:
        return 0
    elif estimate_number <= 5:
        return 1
    elif estimate_number <= 20:
        return 2
    elif estimate_number <= 50:
        return 3
    elif estimate_number <= 100:
        return 4
    elif estimate_number > 100:
        return 5
    else:
        return 'Error'


def calculate_type_and_relative_abundance(dict_to_calculate):
    total = 0
    num_of_type = 0
    for key in dict_to_calculate:
        if dict_to_calculate[key] > 0:
            total += dict_to_calculate[key]
            num_of_type += 1
    return num_of_type, total


def extract_dict_using_keylist(dict_to_extract, list_of_keys):
    new_dict = {}

    for x in list_of_keys:
        if x in dict_to_extract:
            new_dict[x] = dict_to_extract[x]
    return new_dict


def calculate_group_1(num_of_type, total):
    if num_of_type == 0:
        return 0
    elif num_of_type == 1:
        if total <= 2:
            return 4
        else:
            return 6
    else:
        if total == 2:
            return 4
        elif total >= 3:
            return 8


def calculate_group_2(num_of_type, total):
    if num_of_type == 0:
        return 0
    elif num_of_type == 1:
        if total <= 2:
            return 4
        else:
            return 6
    else:
        if total == 2:
            return 6
        elif total >= 3:
            return 8


def calculate_group_3(num_of_type, total):
    if num_of_type == 0:
        return 0
    elif num_of_type <= 2:
        if total <= 2:
            return 2
        else:
            return 4
    else:
        if total >= 3:
            return 6


def calculate_group_4(num_of_type, total):
    if num_of_type == 0:
        return 0
    elif num_of_type <= 2:
        if total < 7:
            return 2
        else:
            return 0
    else:
        if total < 7:
            return 4
        else:
            return 0


def calculate_group_5(total):
    if total == 0:
        return 6
    elif total <= 2:
        return 2
    else:
        return 0
