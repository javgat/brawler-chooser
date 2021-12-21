import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Brawler } from '@javgat/brawlify-api-client-angular';
import { Player } from 'src/app/models/Player';

@Component({
  selector: 'app-input-player',
  templateUrl: './input-player.component.html',
  styleUrls: ['./input-player.component.scss']
})
export class InputPlayerComponent implements OnInit {

  ui_name: string;
  ui_brawler: string;

  @Input() brawler_names: string[];
  @Input() brawlers: Brawler[];
  @Input() player: Player;

  @Output() deletePlayer = new EventEmitter<Player>();

  sendDeletePlayer(player: Player) {
    this.deletePlayer.emit(player);
  }

  sendDelete() {
    this.sendDeletePlayer(this.player);
  }

  constructor() {
    this.player = new Player("Player");
    this.brawler_names = [];
    this.brawlers = [];
    this.ui_brawler = '';
    this.ui_name = '';
  }

  ngOnInit(): void {
  }

  clickChangeName(): void {
    this.ui_name = this.player.name;
    this.player.setName(this.ui_name);
  }

  clickAddBrawler(): void {
    let brawlers_filtered: Brawler[] = this.brawlers.filter(br => br.name == this.ui_brawler);
    if (brawlers_filtered.length == 1) {
      let b: Brawler = brawlers_filtered[0];
      this.player.addBrawler(b);
      this.ui_brawler = '';
    }
  }

  clickRemoveBrawler(name: string): void {
    let brawlers_filtered: Brawler[] = this.brawlers.filter(br => br.name == name);
    if (brawlers_filtered.length == 1) {
      let b: Brawler = brawlers_filtered[0];
      this.player.removeBrawler(b);
    }
  }

  clickDelete(): void {
    this.sendDelete();
  }

}
