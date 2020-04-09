# Tic Tac Toe Project Game

# Following the walkthrough steps workbook instructions
import random

# Step 1: Write a function that can print out a board. 3 by 3 board
# representation from a list passed to the function, where each index of it
# correspond to a number on a number pad
def display_board(b):
  b_copy = b[:]
  separator_h = '----------\n'
  separator_v = '   |   |   \n'
  for i in range(1,10):
    if not b_copy[i]:
      b_copy[i] = ' '
  top = f' {b_copy[7]} | {b_copy[8]} | {b_copy[9]} \n'
  middle = f' {b_copy[4]} | {b_copy[5]} | {b_copy[6]} \n'
  bottom = f' {b_copy[1]} | {b_copy[2]} | {b_copy[3]} \n'
  print(separator_v + top + separator_v + separator_h + separator_v + middle + separator_v + separator_h + separator_v + bottom + separator_v)

test_board = ['#','X','O','X','O','X','O','X','','X']

# Step 2: Write a function that can take in a player input and assign their marker as 'X' or 'O'. Think about using while loops to continually ask until we get a correct answer
def player_input():
  marker = ''
  while not (marker == 'X' or marker == 'O'):
    marker = input('Please choose a maker for player 1 (X or O): ').upper()
    if marker == 'X':
      return ('X','O')
    elif marker == 'O':
      return ('O','X')
    else:
      print('Incorrect marker selection, try again')y

# Step 3: Write a function that takes in the board list object, a marker('X' or 'O'), and a desired position (number 1-9) and assigns it to the board
def place_marker(b, marker, pos):
  b[pos] = marker

# Step 4: Write a function that takes in a board and a mark (X or O) and then checks to see if that mark has won
def win_check(b, mark):
  winning_combs = [[1,2,3],[4,5,6],[7,8,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9],[1,5,9]]
  for comb in winning_combs:
    for i in comb:
      if b[i] != mark:
        break
    else:
  return False

# Step 5: Write a function that uses the random module to randomly decide which player goes first. We may want to lookup random.randint(). Return a string of which player went first
# import random
def choose_first():
  first_player = random.randint(1,2)
  if first_player == 1:
    return 'X'
  else:
    return 'O'

# Step 6: Write a function that returns a boolean indicating whether a space on the board is freely available
def space_available(b, pos):
  return b[pos]

def full_board_check(b):
  for slot in b:
    if not slot:
      return False
  return True

# Step 8: Write a function that asks for a player's next position (as a number 1-9) and then uses the function from step 6 to check if it's a free position. If it is, then return the position for later use
def player_choice(marker, b):
  pos = int(input(f"What's {marker}'s next move? (1-9): "))
  while pos not in range(1,10) or not space_available(b,pos):
    pos = int(input("Please, enter a valid and available position on the board: "))
  return pos


def replay():
  repl = input('Do you want to play again? (Y/N): ').lower()
  return repl in ['yes', 'y']
    
# Step 10: Use while loops and the functions previously defined to run the game

print('Welcome to Tic Tac Toe')

  # Set up the game here
  playerA, playerB = player_input()
  if playerA == choose_first():
    first = playerA
    second = playerB
  else:
    first = playerB
    second = playerA

  print(f"{first} goes first")
  board = ['#','','','','','','','','','']
  display_board(board)
  plays = 0

    # First player's turn
    pos_first = player_choice(first,board)
    place_marker(board, first, pos_first)
    display_board(board)
    plays += 1
    if plays > 4:
      if win_check(board,first):
        print(f"The {first}'s has won the game!")
        break
      elif full_board_check(board):
        print("No more moves available, game tied!")
        break
    # Second player's turn
    pos_second = player_choice(second,board)
    place_marker(board, second, pos_second)
    display_board(board)
    plays += 1
    if plays > 4:
      if win_check(board,second):
        print(f"The {second}'s has won the game!")
        break
      elif full_board_check(board):
        print("No more moves available, game tied!")
        break

  if not replay():
    break

# Course's "Advanced" Solution
""" 
Tic Tac Toe - Advanced Solution
This solution follows the same basic format as the Complete Walkthrough Solution, but takes advantage of some of the more advanced statements we have learned. Feel free to download the notebook to understand how it works!

# Specifically for the iPython Notebook environment for clearing output
from IPython.display import clear_output
import random

# Global variables
theBoard = [' '] * 10   # a list of empty spaces
available = [str(num) for num in range(0,10)] # a List Comprehension
players = [0,'X','O']   # note that players[1] == 'X' and players[-1] == 'O'

def display_board(a,b):
  print('Available   TIC-TAC-TOE\n'+
          '  moves\n\n  '+
        a[7]+'|'+a[8]+'|'+a[9]+'        '+b[7]+'|'+b[8]+'|'+b[9]+'\n  '+
        '-----        -----\n  '+
        a[4]+'|'+a[5]+'|'+a[6]+'        '+b[4]+'|'+b[5]+'|'+b[6]+'\n  '+
        '-----        -----\n  '+
        a[1]+'|'+a[2]+'|'+a[3]+'        '+b[1]+'|'+b[2]+'|'+b[3]+'\n')

display_board(available,theBoard)

""" 
Available   TIC-TAC-TOE
  moves

  7|8|9         | | 
  -----        -----
  4|5|6         | | 
  -----        -----
  1|2|3         | | 
"""

def display_board(a,b):
  print(f'Available   TIC-TAC-TOE\n  moves\n\n  {a[7]}|{a[8]}|{a[9]}        {b[7]}|{b[8]}|{b[9]}\n  -----        -----\n  {a[4]}|{a[5]}|{a[6]}        {b[4]}|{b[5]}|{b[6]}\n  -----        -----\n  {a[1]}|{a[2]}|{a[3]}        {b[1]}|{b[2]}|{b[3]}\n')

display_board(available,theBoard)

""" 
Available   TIC-TAC-TOE
  moves

  7|8|9         | | 
  -----        -----
  4|5|6         | | 
  -----        -----
  1|2|3         | |  
"""

def place_marker(avail,board,marker,position):
  board[position] = marker
  avail[position] = ' '

def win_check(board,mark):
  return ((board[7] ==  board[8] ==  board[9] == mark) or # across the top
  (board[4] ==  board[5] ==  board[6] == mark) or # across the middle
  (board[1] ==  board[2] ==  board[3] == mark) or # across the bottom
  (board[7] ==  board[4] ==  board[1] == mark) or # down the middle
  (board[8] ==  board[5] ==  board[2] == mark) or # down the middle
  (board[9] ==  board[6] ==  board[3] == mark) or # down the right side
  (board[7] ==  board[5] ==  board[3] == mark) or # diagonal
  (board[9] ==  board[5] ==  board[1] == mark)) # diagonal

def random_player():
  return random.choice((-1, 1))
    
def space_check(board,position):
  return board[position] == ' '

def full_board_check(board):
  return ' ' not in board[1:]

def player_choice(board,player):
  position = 0
  
  while position not in [1,2,3,4,5,6,7,8,9] or not space_check(board, position):
      try:
          position = int(input('Player %s, choose your next position: (1-9) '%(player)))
      except:
          print("I'm sorry, please try again.")
      
  return position

def replay():
  return input('Do you want to play again? Enter Yes or No: ').lower().startswith('y')

while True:
  clear_output()
  print('Welcome to Tic Tac Toe!')
  
  toggle = random_player()
  player = players[toggle]
  print('For this round, Player %s will go first!' %(player))
  
  game_on = True
  input('Hit Enter to continue')
  while game_on:
      display_board(available,theBoard)
      position = player_choice(theBoard,player)
      place_marker(available,theBoard,player,position)

      if win_check(theBoard, player):
          display_board(available,theBoard)
          print('Congratulations! Player '+player+' wins!')
          game_on = False
      else:
          if full_board_check(theBoard):
              display_board(available,theBoard)
              print('The game is a draw!')
              break
          else:
              toggle *= -1
              player = players[toggle]
              clear_output()

  # reset the board and available moves list
  theBoard = [' '] * 10
  available = [str(num) for num in range(0,10)]
  
  if not replay():
      break

""" 
Welcome to Tic Tac Toe!
For this round, Player X will go first! 
"""

"""