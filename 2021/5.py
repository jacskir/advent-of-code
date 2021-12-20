import os


def get_overlaps(input):
    vents = get_non_vertical_vents(input)
    w, h = get_max_dimensions(vents)

    floor_map = [[0] * w for i in range(h)]

    for vent in vents:
        if vent[0][0] == vent[1][0]:
            ranges = [vent[0][1], vent[1][1]]
            for x in range(min(ranges), max(ranges)):
                floor_map[vent[0][0]][x] += 1
        else:
            ranges = [vent[0][0], vent[1][0]]
            for x in range(min(ranges), max(ranges)):
                floor_map[x][vent[0][1]] += 1

    overlaps = 0

    x_count = 0
    y_count = 0
    for x in floor_map:
        for y in x:
            if y >= 2:
                print(
                    "x: "
                    + str(x_count)
                    + ", y: "
                    + str(y_count)
                    + ", overlaps: "
                    + str(y)
                )
                overlaps += 1
            y_count += 1
        x_count += 1
        y_count = 0

    count = 0
    max_value = 0
    for point in floor_map[0]:
        if point > max_value:
            max_value = point
        print(str(count) + ", " + str(point))
        count += 1
    print("max_value found: " + str(max_value))

    return overlaps


def get_non_vertical_vents(input):
    non_vertical_vents = []

    if not os.path.isfile(input):
        print("File does not exist.")
        return

    with open(input) as f:
        vents = f.read().splitlines()

    # change format of vents list
    for i in range(len(vents)):
        vents[i] = vents[i].split(" -> ")
        vents[i][0] = [int(j) for j in vents[i][0].split(",")]
        vents[i][1] = [int(j) for j in vents[i][1].split(",")]

        if (vents[i][0][0] in vents[i][1]) or (vents[i][0][1] in vents[i][1]):
            non_vertical_vents.append(vents[i])

    return non_vertical_vents

    # vent_example = [
    #     [260, 605],
    #     [260, 124],
    #     [260, 605],
    #     [260, 124],
    #     [260, 605],
    #     [260, 124],
    #     [260, 605],
    #     [260, 124],
    # ]


def get_max_dimensions(vents):
    max_w = 0
    max_h = 0
    for vent in vents:
        for point in vent:
            if point[0] > max_w:
                max_w = point[0]
            if point[1] > max_h:
                max_h = point[1]

    return max_w, max_h


# print(get_overlaps('input5'))
print("this days solution is unfinished")
