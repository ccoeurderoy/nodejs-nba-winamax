import * as inquirer from 'inquirer';
import * as _ from 'lodash';
import * as Pino from 'pino';

import { askForAPlayer, chooseAPlayer } from './lib/inquirer';
import { getPlayerStats, Player, searchPlayers } from './lib/nba';

const logger: Pino.Logger = Pino({
  prettyPrint: {
    errorProps: 'message,stack',
  },
});

/**
 * Main function
 */
async function main(): Promise<void> {
  /**
   * Look for a player
   * Try again if no player has been found
   */
  let players: Player[] = [];

  while (_.isEmpty(players)) {
    const { playerToLookFor } = await askForAPlayer();
    const result: Player[] = await searchPlayers(playerToLookFor);
    players = players.concat(result);

    if (_.isEmpty(players)) {
      logger.info('No player found, please try again');
      continue;
    }
  }

  /**
   * Choose a player
   */
  let player: Player = players[0];

  if (players.length > 1) {
    const { chosenPlayer } = await chooseAPlayer(players);
    player = chosenPlayer;
  }

  console.log(await getPlayerStats(player.playerId));

  /**
   * Select a game
   */

  /**
   * Select a player
   */

  /**
   * Return his Winamax score
   */
}

main().catch((err: unknown): void => {
  logger.error('An error occurred when running the main script', err);
  process.exit(1);
});
