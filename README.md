# prisoner riddle

The prisoner riddle written in TS, just for fun. With excessive use of OOP.

## Goal

- Create a foundation of the Riddle that one can experiement with the type of Strategy to deploy on to this Riddle, by implement `BasePrisoner` class.
- Explore the concept of Math, in translation to Programming language (with OOP).
- Have some fun!

## The Riddle itself

Rules:

1. 100 Prisoners (0~99) (uses 0-99 instead of 1-100 so we can stick with index based number for programming language).
1. Slip with their numbers are randomly placed in 100 boxes in a room
1. Each prisoner may enter the room one at a time and check upto 50 boxes.
1. They must leave the room exactly as they found and can't communicate with the others afterward
1. if all 100 prisoners find their own number during their turn in the room, they will all be freed. But if even one fails, they will all be executed.

What is their best strategy?

Credit: https://www.youtube.com/watch?v=iSNsgj1OCLA

## The Task

the current code implements only the random approach. Feel free to submit PR for your own solution, or strategies!

To do this extends `BasePrisoner` class implements

1. implement (override) `abstract getNextBoxIndex` method that will return the next boxIndex to open. The class Experiement will automatically validate if such prisoner is in the clear or not.
1. implement (override) `abstract setup` method if you need to setup anything before your prisoner will enter the room.

have fun.

## To Run

1. Pull Source Code
1. switch to node v16, actually you can run with any other node version, the library requirement is very minimal.
1. run `yarn test`

Once run it will print out the results of success cases and failure cases count per your given Prisoner strategy.

## Result

https://gist.github.com/peatiscoding/ca12bf626ff610ceb0e6769f4d1012c5

by Kasidid [@mrbboomm](https://github.com/mrbboomm)
