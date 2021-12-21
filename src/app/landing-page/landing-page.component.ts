import { Component, OnInit } from '@angular/core';
import { Brawler, BrawlerService, MapService, ModelMap } from '@javgat/brawlify-api-client-angular';
import { Player } from '../models/Player';

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
        this.mapList = resp.list.filter(m => !m.disabled && m.name !== 'Unknown');
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

  updateMap(map: any) {
    this.selectedMap = map as ModelMap;
  }

}
