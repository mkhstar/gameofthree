# gameofthree


## Author
- Kusi Musah Hussein
## Description

The goal of this project is to implement a game with two independent units – the players –
communicating with each other using an API.

When a player starts, it incepts a random (whole) number and sends it to the
second player as an approach to starting the game.

The receiving player can now always choose between adding one of {-1, 0, 1}
to get to a number that is divisible by 3. Divide it by three. The resulting whole
number is then sent back to the original sender.

The same rules are applied until one player reaches the number 1 (after the
division).

For each "move", a sufficient output should be generated (mandatory: the added,
and the resulting number).

Both players should be able to play automatically without user input. One of the
players should optionally be adjustable by a user.


## Game Notes

- Each player runs on its own (two browsers)
- Communication hapens via sockets (Socket IO uses websocket if available otherwise falls back to long-polling)
- A player may not be available when the other one starts
- UI with a fancy easily configurable layout
- Architecutre diagram


## Server Side Programming

The main objective for the server is to setup a real-time environment that clients can use to communicate with each other.

### Server Side Tech Stack

- Nodejs (14.x)

    This is the server side runtime used to run the project.

- Typescript

    This is the programming language used.

- NestJS Framework

    This is the framwork used. It has in building efficient and scalable server side applications

- Socket IO
    
    Socket provides the bidirectional and low-latency communication feature of this application. It makes it easier to communicate with clients in real time.

### Server Side Setup

The server side setup is specified below

#### Installation

```bash
$ yarn
```

#### Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```


## Client Side Programming

The main objective for the client side program is to provide a simple user interface that clients can use to communicate with the server in other to communicate with other clients in real time.

### Client Side Tech Stack

- Nodejs (14.x)

    This is the runtime that helps in bundling the project

- ReactJS (17.x)

    This is the main library (framwork) used to build the user interface. It makes building user interfaces fun and easier.


- Typescript

    This is the programming language used.

- Material UI 

    This is a UI library that provides a robust, customizable, and accessible library of foundational and advanced components, that helps in building user interfaces.


### Client Side Setup

#### Installation

```bash
$ cd client && yarn
```

#### Running the app

```bash
# development
$ yarn start

# Build for production
$ yarn build
```