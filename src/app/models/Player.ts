import { Brawler } from "@javgat/brawlify-api-client-angular";

/**
 * Player represents each player that the user has introduced to the system
 * They will form the team
 */
export class Player {
    name: string;
    best_brawlers: Brawler[];

    constructor(name: string){
        this.name = name;
        this.best_brawlers = [];
    }

    setName(name: string) {
        this.name = name;
    }

    hasBrawler(b: Brawler): boolean {
        return this.best_brawlers.some(br => br.id === b.id);
    }

    hasBrawlerName(name: string): boolean {
        return this.best_brawlers.some(br => br.name === name);
    }

    hasBrawlerId(id: number): boolean {
        return this.best_brawlers.some(br => br.id === id);        
    }

    addBrawler(b: Brawler) {
        if (!this.hasBrawler(b)) {
            this.best_brawlers.push(b);
        }
    }

    removeBrawler(b: Brawler) {
        if (this.hasBrawler(b)) {
            this.best_brawlers = this.best_brawlers.filter(br => br.id !== b.id);
        }
    }
}