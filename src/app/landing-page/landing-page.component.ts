import { Component, OnInit } from '@angular/core';
import { Brawler, BrawlerService, MapService, ModelMap, Stat, TeamStat } from '@javgat/brawlify-api-client-angular';
import { Player } from '../models/Player';
import { PlayerTeam } from '../models/PlayerTeam';

/**
 * LandingPage is the main page and the landing page. It will contain all functionalities.
 */

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  brawlerList?: Brawler[];
  mapList?: ModelMap[];

  players: Player[];
  selectedMap?: ModelMap;

  calculatedTeamStats?: TeamStat[];
  calculatedSoloStats?:  Map<Player, Stat>;

  constructor(private brawlerS: BrawlerService, private mapS: MapService) {
    this.downloadBrawlerList();
    this.downloadMapList();
    this.players = [];
  }

  ngOnInit(): void {
  }

  downloadBrawlerList() {
    this.brawlerS.getAllBrawlers().subscribe({
      next: resp => {
        this.brawlerList = resp.list;
      },
      error: err => {
        this.handleError(err, "downloading brawler list");
      }
    });
  }

  downloadMapList() {
    this.mapS.getAllMaps().subscribe({
      next: resp => {
        let tempMapList = resp.list.filter(m => !m.disabled && m.name !== 'Unknown');
        this.mapList = [];
        tempMapList.forEach( (m) => {
          let name = m.name;
          if (this.mapList?.some(mm => mm.name === name)) {
            let number = 2;
            let new_name = name;
            while(this.mapList.some(mm => mm.name === new_name)) {
              new_name = name + " " + number;
              number++;
            }
            name = new_name;
            m.name = new_name;
          }
          this.mapList?.push(m);
        });
      },
      error: err => {
        this.handleError(err, "downloading map list");
      }
    });
  }

  handleError(err: any, message: string){
    let output: string =  "Error ";
    if (err.status != undefined) {
      output = output + " " + err.status;
    }
    output = output + ": " + message;
    console.log(output);
  }

  updatePlayers(players: Player[]) {
    this.players = players;
  }

  updateMap(map: ModelMap) {
    this.selectedMap = map as ModelMap;
  }

  isCompCalculationDisabled(): boolean {
    return this.players.length == 0 || this.selectedMap == undefined;
  }

  calculateComp(): void {
    if (this.selectedMap) {
      let name: string = this.selectedMap.name;
      let id: number = this.selectedMap.id;
      this.mapS.getMap(this.selectedMap.id).subscribe({
        next: resp => {
          let map: ModelMap = resp;
          if (map.teamStats) {
            this.calculateFromTeamstats(map.teamStats);
          }
          if (map.stats) {
            this.calculateFromStats(map.stats);
          }
        },
        error: err => {
          this.handleError(err, "downloading map "+name+" (ID: "+id+")" );
        }
      });
    }
  }

  calculateCompRanged(range: "0-299" | "300-599" | "600+"): void {
    if (this.selectedMap) {
      let name: string = this.selectedMap.name;
      let id: number = this.selectedMap.id;
      this.mapS.getMapWithTrophyRange(this.selectedMap.id, range).subscribe({
        next: resp => {
          let map: ModelMap = resp;
          if (map.teamStats) {
            this.calculateFromTeamstats(map.teamStats);
          }
          if (map.stats) {
            this.calculateFromStats(map.stats);
          }
        },
        error: err => {
          this.handleError(err, "downloading map "+name+" (ID: "+id+")" );
        }
      });
    }
  }

  private calculateFromTeamstats(teamStats: TeamStat[]) {
    this.calculatedTeamStats = this.getPossibleTeamComps(teamStats, this.players);
  }

  private getPossibleTeamComps(teamStats: TeamStat[], players: Player[]): TeamStat[] {
    let pteam = new PlayerTeam(players);
    return teamStats.filter((ts) => {
      return pteam.canPlayAs(ts);
    });
  }

  private calculateFromStats(stats: Stat[]) {
    this.calculatedSoloStats = this.getBestIndivComp(stats, this.players);
  }

  private getBestIndivComp(stats: Stat[], players: Player[]): Map<Player, Stat> {
    let pteam = new PlayerTeam(players);
    return pteam.getBestIndivComp(stats);
  }

}
