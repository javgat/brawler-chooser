import { Component, Input, OnInit } from '@angular/core';
import { Stat } from '@javgat/brawlify-api-client-angular';
import { Player } from 'src/app/models/Player';

/**
 * This component will output the information of the best team compositions based on solo win rates
 */

@Component({
  selector: 'app-output-indiv-wrapper',
  templateUrl: './output-indiv-wrapper.component.html',
  styleUrls: ['./output-indiv-wrapper.component.scss']
})
export class OutputIndivWrapperComponent implements OnInit {

  displayedColumns: string[] = ['player', 'brawler', 'winRate', 'useRate'];

  @Input() stats?:  Map<Player, Stat>;
  @Input() players:  Player[];

  constructor() {
    this.players = [];
  }

  ngOnInit(): void {
  }

  getBrawlerName(player: Player): string {
    let b_id = this.stats?.get(player)?.brawler;
    let filtered = player.best_brawlers.filter(b => b.id == b_id);
    if (filtered.length > 0) {
      return filtered[0].name;
    }
    return "No combination found";
  }

  getWinRate(player: Player): string {
    let stat = this.stats?.get(player);;
    if (stat) {
      let winRate = stat.winRate;
      return Number(winRate).toString();
    }
    return "0";
  }

  getUseRate(player: Player): string {
    let stat = this.stats?.get(player);
    if (stat) {
      let useRate = stat.useRate;
      return Number(useRate).toString();
    }
    return "0";
  }

}
