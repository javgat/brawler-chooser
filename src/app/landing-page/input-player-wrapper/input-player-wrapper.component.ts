import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Brawler } from '@javgat/brawlify-api-client-angular';
import { Player } from 'src/app/models/Player';
import { MAX_NUMBER_PLAYERS } from 'src/app/shared/constants';

@Component({
  selector: 'app-input-player-wrapper',
  templateUrl: './input-player-wrapper.component.html',
  styleUrls: ['./input-player-wrapper.component.scss']
})
export class InputPlayerWrapperComponent implements OnInit {

  max_number_players: number;

  brawler_names: string[];

  @Input() brawlers: Brawler[] = [];
  @Output() playersUpdate = new EventEmitter<Player[]>();

  players: Player[];

  sendPlayersParent(players: Player[]) {
    this.playersUpdate.emit(players);
  }
  
  updateParent() {
    // We send a cloned array, so we are not affected if the parent component modifies it
    let clonedArray: Player[] = [];
    this.players.forEach(p => clonedArray.push(p));
    this.sendPlayersParent(clonedArray);
  }

  constructor() {
    this.players = [];
    this.max_number_players = MAX_NUMBER_PLAYERS;
    this.brawler_names = [];
  }

  ngOnInit(): void {
  }

  addPlayer() {
    if (this.players.length < this.max_number_players) {
      let name = "Player " + (this.players.length + 1);
      let p: Player = new Player(name);
      this.players.push(p);
      this.updateParent();
    }
  }

  deletePlayer(player: Player) {
    if (this.players.includes(player)) {
      this.players = this.players.filter(p => p != player);
      this.updateParent();
    }
  }

  getBrawlerNames(): string[] {
    if (this.brawler_names.length == 0) {
      this.brawler_names = this.calculateBrawlerNames();
    }
    return this.brawler_names;
  }

  clickAddPlayer(): void {
    this.addPlayer();
  }

  private calculateBrawlerNames(): string[] {
    let names: string[] = [];
    this.brawlers.forEach( (b) => {
      names.push(b.name);
    });
    return names;
  }

}
