import { Dictionary, zipObject } from 'lodash';
import * as moment from 'moment';
/* tslint:disable-next-line */
const NBA = require('nba');

import { BoxScore, GameHeader, ParsedPlayerStats, ResultSet, ScoreBoard, Team } from '../lib/nba.interface';

/**
 * Return latest game
 * If the date is not given, look for today until a final game has been found
 * @param date string Date to look for
 */
export async function getLatestGames(date?: string): Promise<{ scoreBoard: ScoreBoard; gameDate: string }> {
  const dateFormat: string = 'MM/DD/YYYY';
  let gameDate: string = moment(date)
    .format(dateFormat)
    .toString();

  let randomFinalGame: GameHeader | undefined;
  let scoreBoard: ScoreBoard | undefined;

  do {
    scoreBoard = (await NBA.stats.scoreboard({
      gameDate,
    })) as ScoreBoard;

    randomFinalGame = scoreBoard.gameHeader.find((game: GameHeader): boolean => {
      return game.gameStatusText === 'Final';
    });

    if (randomFinalGame === undefined) {
      gameDate = moment(gameDate, dateFormat)
        .subtract(1, 'day')
        .format(dateFormat)
        .toString();
    }
  } while (randomFinalGame === undefined);

  return {
    gameDate,
    scoreBoard,
  };
}

/**
 * Get a team instance by its id
 * @param id Unique team identifier
 */
export function getTeamById(id: number): Team {
  return NBA.teams.find((team: Team): boolean => {
    return team.teamId === id;
  });
}

/**
 * Get score details for one game
 * @param gameId Unique game identifier
 */
export async function getBoxScore(gameId: number): Promise<Dictionary<ParsedPlayerStats>[]> {
  const boxScore: BoxScore = await NBA.stats.boxScore({
    GameID: gameId,
  });

  const playerStats: ResultSet | undefined = boxScore.resultSets.find((value: ResultSet): boolean => {
    return value.name === 'PlayerStats';
  });

  if (playerStats === undefined) {
    throw new Error('No Player stats found');
  }

  const parsedPlayerStats: Dictionary<ParsedPlayerStats>[] = [];

  for (const row of playerStats.rowSet) {
    parsedPlayerStats.push(zipObject<ParsedPlayerStats>(playerStats.headers, row));
  }

  return parsedPlayerStats;
}
