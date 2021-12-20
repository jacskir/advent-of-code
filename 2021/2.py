# return total horizontal * total depth from input file
def get_x(input):
    input = open(input, "r")
    horizontal = 0
    depth = 0

    while True:
        # Get next line from file
        line = input.readline()

        # if line is empty, end of file is reached
        if not line:
            break

        instruction = line.split()[0]
        value = int(line.split()[1])

        if instruction == "forward":
            horizontal += value
        elif instruction == "up":
            depth -= value
        elif instruction == "down":
            depth += value

    input.close()

    return horizontal * depth


# return  horizontal *  depth from input file
def get_x2(input):
    input = open(input, "r")
    horizontal = 0
    depth = 0
    aim = 0

    while True:
        # Get next line from file
        line = input.readline()

        # if line is empty, end of file is reached
        if not line:
            break

        instruction = line.split()[0]
        value = int(line.split()[1])

        if instruction == "forward":
            horizontal += value
            depth += aim * value
        elif instruction == "up":
            aim -= value
        elif instruction == "down":
            aim += value

    input.close()

    return horizontal * depth


print("part1: " + str(get_x("input2")))
print("part2: " + str(get_x2("input2")))
