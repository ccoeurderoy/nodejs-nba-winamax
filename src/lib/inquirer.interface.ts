import { Dictionary } from 'lodash';
import { ParsedPlayerStats } from './nba.interface';
/**
 * Game choice for inquirer
 */
export interface GameChoice {
  name: string;
  value: string;
}

/**
 * Inquirer list of choices for players
 */
export interface PlayerChoice {
  name: string;
  value: Dictionary<ParsedPlayerStats>;
}
