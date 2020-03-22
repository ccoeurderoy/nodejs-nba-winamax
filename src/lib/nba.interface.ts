import { List } from 'lodash';

/**
 * Player returned by the "findPlayer" method
 */
export interface Player {
  firstName: string;
  lastName: string;
  playerId: number;
  teamId: number;
  fullName: string;
  downcaseName: string;
}

/**
 * JSON data of the score board page
 * NOTE: This interface is incomplete (I'm lazy)
 * Ex: https://stats.nba.com/scores/03/11/2020
 */
export interface ScoreBoard {
  gameHeader: GameHeader[];
  lineScore: LineScore[];
  seriesStanding: SeriesStanding[];
}

/**
 * Status text (TBD = To be dated, Final = Final score)
 */
export type GameStatusText = 'TBD' | 'Final';
/**
 * Game header
 * Global status on each match per day
 */
export interface GameHeader {
  /* Game date */
  gameDateEst: string;
  /* Game sequence: location on the score board page */
  gameSequence: 1;
  /* Game unique identifier */
  gameId: string;
  /* Status identifier (1 for reported, 3 for final) */
  gameStatusId: number;
  /* Status text (TBD = To be dated, Final = Final score) */
  gameStatusText: GameStatusText;
  /* Game code: {YYYYMMDD}/{Home team id}{Visitor team id} - ex: 20200311/UTAOKC */
  gamecode: string;
  /* Home team unique identifier */
  homeTeamId: number;
  /* Visitor team unique identifier */
  visitorTeamId: number;
  /* Season year */
  season: string;
  /* Live period: Number of quarters + overtime */
  livePeriod: number;
  /* Live PC time: ?? */
  livePcTime: string;
  /* TV broadcaster abbreviation (ex: ESPN) */
  natlTvBroadcasterAbbreviation: string | null;
  /* Live period broadcasted */
  livePeriodTimeBcast: string;
  /* WH status: Set to 1 if the game has been played, otherwise 0 */
  whStatus: 0 | 1;
}

/**
 * Score line per team
 */
interface LineScore {
  /* Game date */
  gameDateEst: string;
  /* Game sequence: location on the score board page */
  gameSequence: 1;
  /* Game unique identifier */
  gameId: string;
  /* Unique team identifier */
  teamId: number;
  /* Team Abbreviation (ex: ORL for Orlando Magic) */
  teamAbbreviation: string;
  /* Team city name */
  teamCityName: string;
  /* Team wins - losses rate (ex: 30-35 for 30 wins 35 losses) */
  teamWinsLosses: string;
  /* Number of points in the first quarter */
  ptsQtr1: number | null;
  /* Number of points in the second quarter */
  ptsQtr2: number | null;
  /* Number of points in the third quarter */
  ptsQtr3: number | null;
  /* Number of points in the fourth quarter */
  ptsQtr4: number | null;
  /* Number of points in the first overtime period */
  ptsOt1: number | null;
  /* Number of points in the second overtime period */
  ptsOt2: number | null;
  /* Number of points in the third overtime period */
  ptsOt3: number | null;
  /* Number of points in the fourth overtime period */
  ptsOt4: number | null;
  /* Number of points in the fifth overtime period */
  ptsOt5: number | null;
  /* Number of points in the sixth overtime period */
  ptsOt6: number | null;
  /* Number of points in the seventh overtime period */
  ptsOt7: number | null;
  /* Number of points in the eighth overtime period */
  ptsOt8: number | null;
  /* Number of points in the ninth overtime period */
  ptsOt9: number | null;
  /* Number of points in the tenth overtime period */
  ptsOt10: number | null;
  /* Total number of points */
  pts: number | null;
  /* ?? */
  fgPct: number | null;
  /* ?? */
  ftPct: number | null;
  /* ?? */
  fg3Pct: number | null;
  /* Number of assists */
  ast: number | null;
  /* Number of rebounds */
  reb: number | null;
  /* Number of turnovers */
  tov: number | null;
}

/**
 * Series standing
 * NOTE: I don't know where it is displayed
 */
interface SeriesStanding {
  /* Game unique identifier */
  gameId: string;
  /* Home team unique identifier */
  homeTeamId: number;
  /* Visitor team unique identifier */
  visitorTeamId: number;
  /* Game date */
  gameDateEst: string;
  /* Number of home team wins */
  homeTeamWins: number;
  /* Number of home team losses */
  homeTeamLosses: number;
  /* Series' leader */
  seriesLeader: string;
}

/**
 * Team instance
 */
export interface Team {
  teamId: number;
  abbreviation: string;
  teamName: string;
  simpleName: string;
  location: string;
}

/**
 * Box score
 */
export interface BoxScore {
  resource: string;
  parameters: {
    GameID: number;
    StartPeriod: number;
    EndPeriod: number;
    StartRange: number;
    EndRange: number;
    RangeType: number;
  };
  resultSets: ResultSet[];
}

/**
 * Result set with row data
 */
export interface ResultSet {
  name: 'PlayerStats' | 'TeamStats' | 'TeamStarterBenchStats';
  headers: (keyof ParsedPlayerStats)[];
  rowSet: List<ParsedPlayerStats>[];
}

/**
 * Formatted Box score method
 */
export interface ParsedPlayerStats {
  /* Unique game identifier */
  GAME_ID: string;
  /* Unique team identifier */
  TEAM_ID: number;
  /* Team abbreviation */
  TEAM_ABBREVIATION: string;
  /* Team City */
  TEAM_CITY: string;
  /* Unique player identifier */
  PLAYER_ID: number;
  /* Player full name */
  PLAYER_NAME: string;
  /* Start position */
  START_POSITION: string;
  /* Comment (ex: coach's decision) */
  COMMENT: string;
  /* Minutes played */
  MIN: string;
  /* Field goals made */
  FGM: number;
  /* Field goals attempted */
  FGA: number;
  /* Field goal percentage */
  FG_PCT: number;
  /* Three Pointers Made */
  FG3M: number;
  /* Three Pointers attempted */
  FG3A: number;
  /* Three Pointers percentage */
  FG3_PCT: number;
  /* Free Throws Made */
  FTM: number;
  /* Free Throws attempted */
  FTA: number;
  /* Free Throw percentage */
  FT_PCT: number;
  /* Offensive Rebounds */
  OREB: number;
  /* Defensive Rebounds */
  DREB: number;
  /* Rebounds */
  REB: number;
  /* Assists */
  AST: number;
  /* Steals */
  STL: number;
  /* Blocks */
  BLK: number;
  /* Turnovers */
  TO: number;
  /* Personal faults */
  PF: number;
  /* +/- */
  PLUS_MINUS: number;
}
