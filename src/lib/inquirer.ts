import * as inquirer from 'inquirer';

import { Player } from './nba';

/**
 * Ask a user for a player to look for
 */
export async function askForAPlayer(): Promise<{ playerToLookFor: string }> {
  return inquirer.prompt([
    {
      type: 'input',
      message: 'Which player are you looking for?',
      name: 'playerToLookFor',
    },
  ]);
}

/**
 * Given a list of players, ask the user to select one
 * @param players List of players
 */
export async function chooseAPlayer(players: Player[]): Promise<{ chosenPlayer: Player }> {
  const choices: { name: string; value: Player }[] = players.map((value: Player): { name: string; value: Player } => {
    return {
      name: value.fullName,
      value,
    };
  });

  return inquirer.prompt([
    {
      type: 'list',
      message: 'Choose a player',
      name: 'chosenPlayer',
      choices,
    },
  ]);
}
