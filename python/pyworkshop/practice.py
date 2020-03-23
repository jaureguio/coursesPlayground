class Vehicle:
  
  def __init__(self, make, model, fuel="gas"):
    self.make = make
    self.model = model
    self.fuel = fuel
  
  def __str__(self):
    return f"This is a new Vehicle, my {self.model}"

  def is_eco_friendly(self):
    if self.fuel == "gas":
      return False
    else:
      return True

class Car(Vehicle): # This is how inheritance is implemented

  def __init__(self, make, model, fuel="gas", num_wheels=4):
    # the super() method allow us to reference the class we are inheriting from in this subclass
    # Calling the __init__ method from an inherited class brings all properties AND instance methods from it into the subclass
    super().__init__(make, model, fuel)
    self.num_wheels = num_wheels # Only available on instances of the Car subclass

four_by_four = Vehicle("Toyota","Tundra", fuel="diesel")
print(four_by_four) # This is a new Vehicle, my Tundra
print(four_by_four.is_eco_friendly()) # True
try:
  four_by_four.num_wheels 
except AttributeError as error:
  print(error)
# AttributeError: 'Vehicle' object has no attribute 'num_wheels'

my_volkswagen = Car("Volkswagen", "Parati")
print(my_volkswagen) # This is a new Vehicle, my Parati
print(my_volkswagen.is_eco_friendly()) # False
print(my_volkswagen.num_wheels) # 4