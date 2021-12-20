def get_winning_score(input):
    draw_numbers = get_draw_numbers(input)
    boards = get_boards(input)

    for draw_number in draw_numbers:
        for board in range(len(boards)):
            row_bingo_count = [0, 0, 0, 0, 0]
            col_bingo_count = [0, 0, 0, 0, 0]
            for row in range(5):
                boards[board][row] = [
                    draw_number + "m" if num == draw_number else num
                    for num in boards[board][row]
                ]

                col = 0
                for num in boards[board][row]:
                    if num.endswith("m"):
                        row_bingo_count[row] += 1
                        col_bingo_count[col] += 1
                    col += 1

            if (5 in col_bingo_count) or (5 in row_bingo_count):
                return get_board_score(boards[board], draw_number)


def get_last_winning_score(input):
    draw_numbers = get_draw_numbers(input)
    boards = get_boards(input)

    last_winning_board = []
    winning_boards = []
    for draw_number in draw_numbers:
        for board in range(len(boards)):
            if board in winning_boards:
                continue

            row_bingo_count = [0, 0, 0, 0, 0]
            col_bingo_count = [0, 0, 0, 0, 0]
            for row in range(5):
                boards[board][row] = [
                    draw_number + "m" if num == draw_number else num
                    for num in boards[board][row]
                ]

                col = 0
                for num in boards[board][row]:
                    if num.endswith("m"):
                        row_bingo_count[row] += 1
                        col_bingo_count[col] += 1
                    col += 1

            if (5 in col_bingo_count) or (5 in row_bingo_count):
                last_winning_board = [boards[board], draw_number]
                winning_boards.append(board)
    return get_board_score(last_winning_board[0], last_winning_board[1])


# return a list of draw numbers
def get_draw_numbers(input):
    with open(input) as f:
        return f.readline().rstrip().split(",")


# return a list of boards as 2d array
def get_boards(input):
    boards = []

    with open(input) as f:
        rows = f.readlines()

    rows.pop(0)
    for row in rows:
        if row == "\n":
            rows.remove("\n")

    rows = [j.strip().replace("  ", " ").split(" ") for j in rows]

    board = []
    for row in rows:
        board.append(row)
        if len(board) == 5:
            boards.append(board)
            board = []

    return boards


# get score from the winning board
def get_board_score(board, draw_number):
    sum = 0
    for row in board:
        for num in row:
            if not num.endswith("m"):
                sum += int(num)
    return sum * int(draw_number)


print("part1: " + str(get_winning_score("input4")))
print("part2: " + str(get_last_winning_score("input4")))
