# Blackjack Game Project

# Following the walkthrough steps workbook instructions
"""
To play a hand of Blackjack the following steps must be followed:
  1. Create a deck of 52 cards.
  2. Shuffle the deck
  3. Ask the Player for their bet.
  4. Make sure that the Player's bet dows not exceed their available chips.
  5. Deal two cards to the Dealer and two cards to the Player.
  6. Show only one of the Dealer's cards, the other remaims hidden.
  7. Show both of the Player's cards.
  8. Ask the Player if they wish to Hit, and take another card.
  9. If the Player's hand doesn'nt Bust (go over 21), ask if they'd like to Hit again.
  10. If a Player Stands, play the Dealer's hand. the Dealer always Hit until the Dealer's value meets or exceeds 17.
  11. Determine the winner and adjust the Player's chips accordingly.
  12. Ask the Player if they'd like to play again.

Playing Cards:

  - A standard deck of playing cards has four suits (Hearts, Diamonds, Clubs and Spades) and thirteen ranks (2 through 10, then the face cards Jack, Queen, King and Ace) for a total of 52 cards per deck. Jacks, Queens and Kings all have a rank of 10. Aces have a rank of either 11 or 1 as needed to reach 21 without busting. As a starting point in our program, we may want ot assign variables to store a list of suits, ranks and then use a dictionary to map ranks to values.

The Game:

  - Imports and Global Variables:

   ## STEP 1: Import the random module. 
    
    -  This will be used to shuffle the deck prior to dealing. Then, declare variables to store suits, ranks and values. You can develop your own system, or copy ours below. Finally, declare a Boolean valye to be used to control while loops. Thisi a commomn practice used to control the flow of the game. 
"""

import random

suits = ('Hearts', 'Diamonds', 'Spades', 'Clubs')
ranks = ('Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace')
# values = {(ranks[i-2]):(i if i <= 10 else 10) for i in range(2,15)} adjusting the value for Ace in the resulting dict
values = {'Two': 2, 'Three': 3, 'Four': 4, 'Five': 5, 'Six': 6, 'Seven': 7, 'Eight': 8, 'Nine': 9, 'Ten': 10, 'Jack': 10, 'Queen': 10, 'King': 10, 'Ace': 11}

playing = True

"""
Class Definitions:

  - Consider making a Card class where each Card object has a suit and a rank, then a Deck class to hold all 52 Card objects (Deck class should allow to shuffled the deck), and finally a Hand class that holds those Cards that have been dealt to each player from the Deck.

  ## STEP 2: Create a Card Class. 

    - A Card object really only needs two attributes: suit and rank. We might add an attribute for "value" - we chose to handle value later when developing our Hand class.
    In addition to the Card's __init__ method, consider adding a __str__ method that, when asked to print a Card, returns a string in the form "Two of Hearts".
"""

class Card:

  def __init__(self,rank,suit):
    self.suit = suit
    self.rank = rank

  def __str__(self):
    return f"{self.rank} of {self.suit}"
  
"""
  ## STEP 3: Create a Deck Class.

    - Here we might store 52 card objects in a list that can later be shuffled. First, though, we need to instantiate all 52 unique card objects and add them to our list. So as long as the Card class definition appears in our code, we can build Card objects inside our Deck __init__ method. Consider iterating over sequences of suits and ranks to build out each card. This might appear inside a Deck class __init__ method:

      for suit in suits:
        for rank in ranks:

    - In addition to an __init__ method we'll want to add methods to shuffle our deck, and to deal out cards during gameplay.

    - OPTIONAL: we may never need to print the contents of the deck during gameplay, but having the ability to see the cards inside it may help troubleshoot any problems that occur during development. With this in mind, consider adding a __str__ method to the class definition.
"""

class Deck:
  def __init__(self):
    # Deck built using list comprehension. Nesting of for loops is read from left to right (outer loop is first)
    self.deck = [Card(rank,suit) for suit in suits for rank in ranks]
  def shuffle(self):
    deck = self.deck
    for i in range(len(self.deck)):
      rand_int = random.randint(i,len(self.deck)-1)
      deck[i], deck[rand_int] = deck[rand_int], deck[i]
    """
    # Using the shuffle method from random module
    random.shuffle(self.deck)
    """
  def deal(self):
    return self.deck.pop()
  def __str__(self):
    for card in self.deck:
      return "\n".join([str(card) for card in self.deck])

"""
  ## STEP 4: Create a Hand Class.

    - In addtion to holding Card objects dealt from the Deck, the Hand class may be used to calculate the value of those cards using the values dictionary defined above. It may also need to adjust for the value of Aces when appropriate.
"""

class Hand:

  def __init__(self):
    self.cards = []
    self.value = 0
    self.aces = 0

  def add_card(self,card):
    self.cards.append(card)
    self.value += values[card.rank]
    if card.rank is 'Ace':
      self.aces += 1

  def adjust_for_aces(self):
    """ Course's version
    while self.value > 21 and self.aces:
      self.value -= 10
      self.aces -= 1
    """
    for _ in range(self.aces):
      if self.value > 21:
        self.value -= 10
      else:
        break
    return self.value

"""
  ## STEP 5: Create a Chips Class.

    - In addition to decks of cards and hands, we need to keep track of a Player's starting chips, bets, and ongoing winnings. This could be done using global variables, but in the spirit of object oriented programming, let's make a Chip class instead.
"""

class Chips:
  def __init__(self,chips = 100):
    self.total = chips
    self.bet = 0
  def win_bet(self):
    self.total += self.bet
  def lose_bet(self):
    self.total -= self.bet

"""
Function Definitions

  - A lot of steps are going to be repetitive. That's where functions come in.

  ## STEP 6: Write a function for taking bets.

    - Since we're asking the user for an integer value, this would be a good place to use try/except. Remember to check that a Player's bet can be covered by their available chips.
"""

def take_bet(chips):
  while True:
    try:
      current_bet = int(input('Please enter the amount of your bet for this hand: '))
    except:
      print("Sorry, your input is not correct, a numeric value is expected. Try again")
    else: 
      if current_bet < chips.total:
        chips.bet = current_bet
        break
    print(f"Not enough chips to cover your bet! Current total is {chips.total}")

"""
  ## STEP 7: Write a function for taking Hits.

    - Either player can take hits until they bust. This function will be called during gameplay anytime a Player requests a hit, or a Dealer's hand is less than 17 or Player's hand value (we should choose one condition). It should take in Deck and Hand objects as argumetns, and deal one card off the deck and add it to the Hand. We may want it to check for aces in the event that a player's hand exceeds 21.
"""

def hit(deck,hand):
  hand.add_card(deck.deal())
  hand.adjust_for_aces()

"""
  ## STEP 8: Write a function prompting the Player to hit or Stand.

    - This function should accept the deck and the Player's hand as arguments, and assign playing as a global variable.
    - If the Player Hits, employ the hit() function from above. If the Player Stands, set the playing variable to False - this will control the behavior of a while loop later on in our code.
"""

def hit_or_stand(deck,hand):
  global playing
  while playing:
    player_choice = input("\nDo you want to hit another card or stand? (h or s): ")
    if player_choice[0].lower() == 'h':
      hit(deck,hand)
      break
    elif player_choice[0].lower() == 's':
      playing = False
    else:
      print("Sorry, i didn't understand your input, try again please")


"""
  ## STEP 9: Write functions to display cards.

    - When the starts, and after each time Player takes a card, the Dealer's first card is hidden and all of Player's cards are visible. At the end of teh hand all cards are shown, and we may want to show each hand's total value. Write a function for each of these scenarios.
"""

def show_cards(player,dealer,all = False):
  if all: 
    start = 0
  else:
    start = 1
  print("\n##################################")
  print("\nPLAYER'S HAND:")
  for card in player.cards:
    print(card)
  print(f"Player's hand total: {player.value}")

  print("\nDEALER'S HAND:")
  for card in dealer.cards[start:]:
    print(card)
  if not all:
    print("***Dealer's card hidden here!***")
  else:
    print(f"Dealer's hand total: {dealer.value}")
  print("\n##################################")
    

""" 
  ## STEP 10: Write functions to handle end of game scenarios.

    - Remember to pass Player's hand, Dealer's hand and chips as needed.
"""

def player_busts(player,dealer,chips):
  print('\nBUST PLAYER!')
  chips.lose_bet()
  
def player_wins(player,dealer,chips):
  print('\nPLAYER WINS!')
  chips.win_bet()

def dealer_busts(player,dealer,chips):
  print('\nPLAYER WINS! DEALER BUSTED!')
  chips.win_bet()

def dealer_wins(player,dealer,chips):
  print('\nBUST PLAYER!')
  chips.lose_bet()

def push(player,dealer):
  print('\nDealer and Player tie! PUSH')

# GAME LOGIC STARTS HERE:

while True:
  # Print an opening statement
  print('\nWELCOME TO THE BLACKJACK GAME IN PYTHON!')

  # Create & shuffle the deck, deal two cards to each player
  deck = Deck()
  deck.shuffle()

  player = Hand()
  player.add_card(deck.deal())
  player.add_card(deck.deal())

  dealer = Hand()
  dealer.add_card(deck.deal())
  dealer.add_card(deck.deal())

  # Setup the Player's chips
  chips = Chips()

  # Prompt the player for their bet
  take_bet(chips)

  # Show cards (but keep one dealer card hidden)
  show_cards(player,dealer)

  while playing: # recall this variable from the hit_or_stand function
    
    # Promt for Player to Hit or Stand
    hit_or_stand(deck,player)

    # Show cards (but keep one dealer card hidden)
    if playing:
      show_cards(player,dealer)

    # If Player's hand exceeds 21, run player_busts() and break out of the loop
    if player.value > 21:
      player_busts(player,dealer,chips)
      break
    elif player.value == 21:
      player_wins(player,dealer,chips)
      playing = False

  show_cards(player,dealer,True)

  if player.value < 21:
    while dealer.value < player.value:
      hit(deck,dealer)
      show_cards(player,dealer,True)

    if dealer.value > 21:
      dealer_busts(player,dealer,chips)
    elif dealer.value == player.value:
      push(player,dealer)
    else:
      dealer_wins(player,dealer,chips)

  print(f"\nPlayer's current chips are: {chips.total}")

  play_again = input("Do you want to play again? (y/n): ")
  if play_again.lower() == 'n':
    print("\nThanks for playing with us, see you soon!")
    break
  else: 
    playing = True
    continue

"""
## IMPROVEMENTS TO MAKE:

  - Chips are restored to 100 when the game starts again without being exited by the user. Chips total should persist between continuos plays of the game.
    - Game should aks the user to refill chips after losing all of them, this with the goal of continue the game.
  - When the game enters Dealer's turn, we should pause between hits of the Dealer, prompting the user to continue to the next move of it.
"""

    