import * as inquirer from 'inquirer';
import { Dictionary, isNull } from 'lodash';

import { GameChoice, PlayerChoice } from '../lib/inquirer.interface';
import { GameHeader, ParsedPlayerStats, Player, ScoreBoard, Team } from '../lib/nba.interface';
import { getBoxScore, getTeamById } from './nba';

inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'));

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

/**
 * Ask for a date to look for games
 */
export async function askForADate(): Promise<{ dateToLookFor?: string }> {
  return inquirer.prompt([
    {
      type: 'datetime',
      name: 'dateToLookFor',
      message: 'Enter a date to look for a game (it will look for latest games by default',
      format: ['mm', '/', 'dd', '/', 'yyyy'],
    },
  ]);
}

/**
 * List games and choose one
 * @param scoreBoard NBA Score board
 */
export async function chooseAGame(scoreBoard: ScoreBoard, gameDate: string): Promise<{ chosenGameId: number }> {
  const choices: GameChoice[] = scoreBoard.gameHeader.map(
    (value: GameHeader): GameChoice => {
      const homeTeam: Team = getTeamById(value.homeTeamId);
      const visitorTeam: Team = getTeamById(value.visitorTeamId);

      return {
        name: `${homeTeam.teamName} - ${visitorTeam.teamName} (${value.whStatus === 1 ? 'Final score' : 'Reported'})`,
        value: value.gameId,
      };
    },
  );

  return inquirer.prompt([
    {
      type: 'list',
      name: 'chosenGameId',
      message: `Choose a game (${gameDate}):`,
      choices,
    },
  ]);
}

/**
 * Display a list of players who have played in the game
 * Sorted by points DESC
 * @param gameId Unique game identifier
 */
export async function getListOfPlayers(gameId: number): Promise<{ player: ParsedPlayerStats }> {
  const game: Dictionary<ParsedPlayerStats>[] = await getBoxScore(gameId);

  const choices: PlayerChoice[] = game
    .map(
      (value: Dictionary<ParsedPlayerStats>): PlayerChoice => {
        return {
          name: `${value.PLAYER_NAME} (${value.TEAM_CITY} - ${value.PTS} pts)`,
          value,
        };
      },
    )
    .filter((player: PlayerChoice): boolean => {
      return !isNull(player.value.PTS);
    });

  choices.sort((player1: PlayerChoice, player2: PlayerChoice): number => {
    if (player1.value.PTS > player2.value.PTS) {
      return -1;
    }

    return 1;
  });

  return inquirer.prompt([
    {
      type: 'list',
      name: 'player',
      message: 'Choose a player (sorted by decreasing points)',
      choices,
    },
  ]);
}
