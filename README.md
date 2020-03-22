# NodeJS NBA Winamax score calculator

A little prompt asking you to select a game and a user to calculate [Winamax](https://www.winamax.fr/jde) score.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to install [NodeJS](https://nodejs.org/en/download/) on your local machine.

### Installing

First, install node modules running:

```bash
npm install
```

### Usage

To run the prompt script, run:

```bash
npm start
```

It will run the `index.ts` file using [ts-node](https://github.com/TypeStrong/ts-node) library. If you want to run the compiled JavaScript file, simply run:

```bash
npm run start:oldschool
```

It will then ask you to enter a date and will look for NBA games. After selecting a game, select a player. The Winamax score will then be displayed.

### Coding Style

This project has been set up with [prettier](https://prettier.io/).

## Built With

* [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
* [Lodash](https://lodash.com/) - JavaScript utility library
* [Moment.js](https://momentjs.com/) - Date manipulation library
* [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) - A command line user interface
* [NBA](https://github.com/bttmly/nba) - A NodeJS Client for [stats.nba.com](https://stats.nba.com)
* [Pino](https://getpino.io/#/) - A NodeJS logger library

## Contributing

This module uses [semantic-release](https://github.com/semantic-release/semantic-release), please follow these [instructions](https://github.com/semantic-release/commit-analyzer#default-rules-matching) to contribute to the project or use `npm run commit`.
