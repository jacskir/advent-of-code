def get_power_consumption(input):
    gamma_rate = ""
    epsilon_rate = ""
    tally = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
    ]

    with open(input) as f:
        for line in f:
            count = 0
            for i in line:
                if i == "0":
                    tally[count][0] += 1
                elif i == "1":
                    tally[count][1] += 1
                count += 1

    for count in tally:
        if count[0] > count[1]:
            gamma_rate += "0"
        else:
            gamma_rate += "1"

    epsilon_rate = (
        gamma_rate.replace("0", "%temp%").replace("1", "0").replace("%temp%", "1")
    )

    return int(gamma_rate, 2) * int(epsilon_rate, 2)


def get_life_support_rating(input):
    oxygen_generator_rating = ""
    CO2_scrubber_rating = ""
    original_values = []
    values = []

    with open(input) as f:
        for line in f:
            original_values.append(line.replace("\n", ""))

    values = original_values

    for x in range(2):
        iterations = 0
        while len(values) > 1:
            values_zero = []
            values_one = []

            for value in values:
                if value[iterations : iterations + 1] == "0":
                    values_zero.append(value)
                elif value[iterations : iterations + 1] == "1":
                    values_one.append(value)

            if x == 1:
                if len(values_one) >= len(values_zero):
                    values = values_one
                else:
                    values = values_zero
            else:
                if len(values_one) < len(values_zero):
                    values = values_one
                else:
                    values = values_zero

            iterations += 1

        if x == 1:
            oxygen_generator_rating = int(values[0], 2)
        else:
            CO2_scrubber_rating = int(values[0], 2)

        values = original_values

    return oxygen_generator_rating * CO2_scrubber_rating


print("part1: " + str(get_power_consumption("input3")))
print("part2: " + str(get_life_support_rating("input3")))
