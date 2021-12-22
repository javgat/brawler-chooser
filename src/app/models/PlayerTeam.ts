import { Stat, TeamStat } from "@javgat/brawlify-api-client-angular";
import { Player } from "./Player";

/**
 * Player team represents a team of players
 */
export class PlayerTeam {
    players: Player[];

    constructor(players: Player[]) {
        this.players = [];
        players.forEach((p) => {
            this.players.push(p);
        })
    }

    /**
     * Checks if the team can fit the TeamStat composition.
     * @param ts 
     * @returns If the team can fit the composition
     */
    canPlayAs(ts: TeamStat): boolean {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].hasBrawlerId(ts.brawler1)) {
                for (let j = 0; j < this.players.length; j++) {
                    if (j != i && this.players[j].hasBrawlerId(ts.brawler2)) {
                        for (let k = 0; k < this.players.length; k++) {
                            if (k != j && k != i) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    /**
     * Returns the best team composition for the team members based on individual brawler statistics
     * @param stats 
     * @returns A map pairing each player with the stat with the brawler they should choose. It might be empty.
     */
    getBestIndivComp(stats: Stat[]): Map<Player, Stat> {
        let comp: Map<Player, Stat> = new Map();
        PlayerTeam.recGetBestIndivComp(this.players, 0, stats, comp);
        return comp;        
    }

    private static recGetBestIndivComp(players: Player[], iterPlayerNumber: number, stats: Stat[], comp: Map<Player, Stat>): boolean {
        // Recursion base
        if (iterPlayerNumber == players.length) {
            return true;
        }
        // Recursion recursive
        let playerFit: boolean = false;
        if (players.length > iterPlayerNumber) {
            let iPlayer = players[iterPlayerNumber];
            for (let i = 0; i < stats.length; i++) {
                let iStat = stats[i];
                if (!Array.from(comp.values()).includes(iStat)) {
                    if (iPlayer.hasBrawlerId(iStat.brawler)) {
                        comp.set(iPlayer, iStat); // Try adding the player and the stat
                        playerFit = this.recGetBestIndivComp(players, iterPlayerNumber + 1, stats, comp);
                        if (!playerFit) {
                            comp.delete(iPlayer);
                            i = -1; // Start checking the stats from the begining
                        }
                    }
                }
                if (playerFit) {
                    break;
                }
            }
        }
        return playerFit;
    }

}