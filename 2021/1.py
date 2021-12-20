# return number of depth increases from input file
def get_depth_increases(input):
    input = open(input, "r")
    prev_line = ""
    depth_increases = 0

    while True:
        # Get next line from file
        line = input.readline()

        # if line is empty, end of file is reached
        if not line:
            break

        if prev_line != "":
            if int(line) > int(prev_line):
                depth_increases += 1
        prev_line = line

    input.close()

    return depth_increases


# return number of depth increases from input file
# using three-measurement sliding window
def get_depth_increases_three_sliding(input):
    input = open(input, "r")
    prev_total = -1
    depth_increases = 0
    values = []

    while True:
        total = -1

        # Get next line from file
        line = input.readline()

        # if line is empty, end of file is reached
        if not line:
            break

        values.append(int(line))

        if len(values) > 3:
            values.pop(0)

        if len(values) == 3:
            total = sum(values)

        if prev_total != -1:
            if total > prev_total:
                depth_increases += 1
        prev_total = total

    input.close()

    return depth_increases


print("part1: " + str(get_depth_increases("input1")))
print("part2: " + str(get_depth_increases_three_sliding("input1")))
