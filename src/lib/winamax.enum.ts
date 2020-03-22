/**
 * Winamax coefficients for each stats
 */
export enum COEFF {
  DIFF = 0.15,
  '2_PTS_MADE' = 2,
  '2_PTS_MISSED' = -0.5,
  '3_PTS_MADE' = 3,
  '3_PTS_MISSED' = -0.5,
  FREE_THROWS_MADE = 1,
  FREE_THROWS_MISSED = -0.5,
  DEF_REBOUNDS = 0.75,
  OFF_REBOUNDS = 1,
  ASSISTS = 1,
  INTERCEPTIONS = 2,
  BLOCKS = 2,
  TURNOVERS = -0.75,
  PERSONAL_FAULT = -0.5,
}
