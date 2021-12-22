import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { TeamStat } from '@javgat/brawlify-api-client-angular';

/**
 * This component will output the information of the best team compositions available to the user
 */

@Component({
  selector: 'app-output-team-wrapper',
  templateUrl: './output-team-wrapper.component.html',
  styleUrls: ['./output-team-wrapper.component.scss']
})
export class OutputTeamWrapperComponent implements OnInit {

  displayedColumns: string[] = ['name', 'winRate', 'useRate'];

  @Input() teamStats: TeamStat[];
  teamStatsShow: TeamStat[];

  constructor() {
    this.teamStats = [];
    this.teamStatsShow = [];
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }){
    let change: SimpleChange = changes['teamStats']; 
    if (change.currentValue != change.previousValue) {
      this.orderByWinRate();
    }
  }

  orderByWinRate() {
    this.teamStatsShow = this.teamStats.sort((f, s) => {
      return s.data.winRate - f.data.winRate;
    });
  }

}
