const NBA = require('nba');

/**
 * Return a list of player to choose
 * @param playerToSearch Player to search
 */
export async function searchPlayers(playerToSearch: string): Promise<Player[]> {
  return NBA.searchPlayers(playerToSearch);
}

/**
 * Return player stats
 * @param playerId Player Id to find
 */
export async function getPlayerStats(playerId: number): Promise<any> {
  return NBA.stats.playerSplits({
    PlayerID: playerId,
    Season: '2019-20',
  });
}

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
