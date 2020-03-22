import * as _ from 'lodash';
import * as Pino from 'pino';

import { askForADate, chooseAGame, getListOfPlayers } from './core/inquirer';
import { getLatestGames } from './core/nba';
import { getPlayerScore } from './core/winamax';

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
   * Ask for a date to look for games
   */
  const { dateToLookFor } = await askForADate();

  /**
   * Find latest games
   */
  const { scoreBoard, gameDate } = await getLatestGames(dateToLookFor);

  /**
   * List games and ask the user to find one
   */
  const { chosenGameId } = await chooseAGame(scoreBoard, gameDate);

  /**
   * Get a list of player sorted by point made
   */
  const { player } = await getListOfPlayers(chosenGameId);

  /**
   * Calculate Winamax scores
   */
  const winamaxPlayerScore: number = getPlayerScore(player);

  logger.info(`${player.PLAYER_NAME} has a score of ${winamaxPlayerScore.toFixed(2)} points!`);
  process.exit(0);
}

main().catch((err: Error): void => {
  logger.error(err, 'An error occurred when running the main script');
  process.exit(1);
});
