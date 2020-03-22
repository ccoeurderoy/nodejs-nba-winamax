import { multiply } from 'lodash';

import { ParsedPlayerStats } from '../lib/nba.interface';
import { COEFF } from '../lib/winamax.enum';

/**
 * Calculate Winamax score for a given player
 * @param player Player to analyze
 */
export function getPlayerScore(player: ParsedPlayerStats): number {
  let winamaxScore: number = 0;
  /**
   * Difference
   */
  winamaxScore += multiply(player.PLUS_MINUS, COEFF.DIFF);
  /**
   * 2 points made
   */
  const twoPointsMade: number = player.FGM - player.FG3M;
  winamaxScore += multiply(twoPointsMade, COEFF['2_PTS_MADE']);

  /**
   * 2 points missed
   */
  winamaxScore += multiply(player.FGA - player.FG3A - twoPointsMade, COEFF['2_PTS_MISSED']);

  /**
   * 3 points made
   */
  winamaxScore += multiply(player.FG3M, COEFF['3_PTS_MADE']);

  /**
   * 3 points missed
   */
  winamaxScore += multiply(player.FG3A - player.FG3M, COEFF['3_PTS_MISSED']);

  /**
   * Free throws made
   */
  winamaxScore += multiply(player.FTM, COEFF.FREE_THROWS_MADE);

  /**
   * Free throws missed
   */
  winamaxScore += multiply(player.FTA - player.FTM, COEFF.FREE_THROWS_MISSED);

  /**
   * Defensive rebounds
   */
  winamaxScore += multiply(player.DREB, COEFF.DEF_REBOUNDS);

  /**
   * Offensive rebounds
   */
  winamaxScore += multiply(player.OREB, COEFF.OFF_REBOUNDS);

  /**
   * Assists
   */
  winamaxScore += multiply(player.AST, COEFF.ASSISTS);

  /**
   * Interceptions
   */
  winamaxScore += multiply(player.STL, COEFF.INTERCEPTIONS);

  /**
   * Blocks
   */
  winamaxScore += multiply(player.BLK, COEFF.BLOCKS);

  /**
   * Turnovers
   */
  winamaxScore += multiply(player.TO, COEFF.TURNOVERS);

  /**
   * Personal faults
   */
  winamaxScore += multiply(player.PF, COEFF.PERSONAL_FAULT);

  return winamaxScore;
}
