/* 
####### TYPESCRIPT HANDBOOK #######

  ### Variable types ### 

    --> Type assertions (<something> as <type/interface>) are used to override strictly typed checking of Typescript when something is declared without the required value. When implemented we are
        basically saying to Typescript that we will provide the required value/type in the future for the given thing been checked:

          */
          type ObjectNum = { value: number};
          let badObj: ObjectNum = {}; //ERROR
          let goodObj: ObjectNum = {} as ObjectNum;
          /*

  ### Interfaces ### 
  
    --> An interface is used to specify the different shapes that a given object (and all its subtypes like functions and array) should have.
      
        * Object properties define the value types an object of a given shape (interface) must have. Object whose type/shape is defined by an interface as follows, should
          at least have the properties defined in the interface:

          */
          interface User {
            email: string;
            password: string;
          }

          function printUser(userObj: User) {
            console.log(userObj.email);
          }
          /*
      
        * Optional properties provide greater flexibility to our interfaces allowing an object to skip properties but also preventing it of having additional 
          unexpected properties (based on the interface definition):

          > interface User {
            ...
            nickname?: string;
            age?: number;
          }

        * Readonly properties are restricted to be modify only when declaring an object.
        * ReadonlyArray<array> can be used to remove all mutable methods from an array.

          */  
          interface User {
            //...
            readonly joinedBy: string;
            readonly ID: string;
          }

          let a: number[] = [1,2,4];
          let ro: ReadonlyArray<number> = a;
          ro[0] = 12; //ERROR
          /*    
        
        *

        * Functions are set pretty similar to the way a function is defined. The function keyword is ommited in this case:

          > interface AddTwo {
            (val: number): number;
          }

        * Index signatures are used to give flexibility to the definition of an object. With them we can set the type of any additional property not 
          strictly required in the interface definition:
          
          > interface User {
            ...
            [anythingWeWant: string]: string;
          }

      *** Excess Property Checks ***


*/