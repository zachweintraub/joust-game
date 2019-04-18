# Jousting

#### This project recreates the arcade classic Joust, 4/18/19


#### By _**Brendan Hellar, Zach Weintraub, Dylan Crocker, Crystal Fecteau**_

## Description

#### The goal of this project is to recreate the arcade classic Joust.
<br>

## Setup/Installation Requirements

-   Please clone from the Github repo
-   Open index.html in your favorite browser.

  or

-   Click [this link](https://dtpc22.github.io/joust/).

## How to start game

| Start Game | Input | Output |
| :-------------     | :------------- | :------------- |
| **Load Game** | User input: "Press Enter" | Output: "Joust Game Play" |
| **Restart Game**| User input: "Enter" | Output: "Reset Game" |

## Players Controls

|  Player 1  |  Player 2 |
| :-------------     | :------------- |
| Left Screen | Right Screen |
| A = Move Left | Left Arrow = Move Left |
| D = Move Right | Right Arrow = Move Right |
| Spacebar = Fly/Jump | [/?] Key = Fly/Jump |

## Orb Functions

| Points | Input | Output |
| :-------------     | :------------- | :------------- |
| **Green Orb** | User input: "Picks up green orb from enemies killed" | Output: "Player gains one point" |
| **Yellow Orb**| User input: "Picks up yellow orb from players killed" | Output: "Player gains 10 second speed boost" |

## Win and Lose Collision Conditions

| Kills| Action | Output |
| :-------------     | :------------- | :------------- |
| **Win** | User Action: "Higher position on face to face collision" | Output: "Higher player wins" |
| **Lose**| User Action: "Lower position on face to face collision" | Output: "Lower player dies and respawns" |
| **Win** | User Action: "Player attacking from behind" | Output: "Attacking player wins" |
| **Lose**| User Action: "Player facing away from collision" | Output: "Player facing away dies and respawns" |

## Game Winner Conditions

| Winner | |
| :-------------     | :------------- |
| **Win** | First Player to 30pts |
| **Lose** | Player did now get to 30pts first |


## Known Bugs

Point orbs occasionally disappear. Unknown how to recreate.

## Support and contact details

If you have any issues please contact:
* Brendan Hellar - bwhellar@gmail.com
* Zach Weintraub - zachweintraub@gmail.com
* Dylan Crocker - dylan.t.crocker@gmail.com
* Crystal Fecteau - Crystal_Fecteau@ymail.com

## Technologies Used

* HTML
* CSS
* JavaScript

### License

*This software is licensed under the MIT license*

Copyright (c) 2019**_{Brendan Hellar, Zach Weintraub, Dylan Crocker, Crystal Fecteau}_
