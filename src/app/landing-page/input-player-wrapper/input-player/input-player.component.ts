import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Brawler } from '@javgat/brawlify-api-client-angular';
import { Player } from 'src/app/models/Player';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-input-player',
  templateUrl: './input-player.component.html',
  styleUrls: ['./input-player.component.scss']
})
export class InputPlayerComponent implements OnInit {

  ui_name: string;
  ui_brawler: string;

  brawler_names_autocompletion: string[];

  editingName: boolean;

  separatorKeysCodes: number[] = [ENTER, COMMA];

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
    this.brawler_names_autocompletion = this.brawler_names;
    this.brawlers = [];
    this.ui_brawler = '';
    this.ui_name = '';
    this.editingName = false;
  }

  ngOnInit(): void {
  }

  clickStartChangeName(): void {
    this.ui_name = this.player.name;
    this.editingName = true;
  }

  clickCancelChangeName(): void {
    this.editingName = false;
  }

  clickSaveChangeName(): void {
    this.player.setName(this.ui_name);
    this.editingName = false;
  }

  clickRemoveBrawler(name: string): void {
    let brawlers_filtered: Brawler[] = this.brawlers.filter(br => br.name.toUpperCase() == name.toUpperCase());
    if (brawlers_filtered.length == 1) {
      let b: Brawler = brawlers_filtered[0];
      this.player.removeBrawler(b);
    }
  }

  clickDelete(): void {
    this.sendDelete();
  }

  updateBrawlerList(): void {
    if (this.ui_brawler != '') {
      this.brawler_names_autocompletion = this.brawler_names.filter( (b) => {
        return b.toUpperCase().includes(this.ui_brawler.toUpperCase());
      });
    } else {
      this.brawler_names_autocompletion = this.brawler_names;
    }
    this.brawler_names_autocompletion = this.brawler_names_autocompletion.filter( (b) => !this.player.hasBrawlerName(b));
  }

  /**
   * Adds brawler to the user
   * @param name Name of the brawler
   * @returns True if the brawler has been added successfully
   */
  addBrawler(name: string): boolean {
    let brawlers_filtered: Brawler[] = this.brawlers.filter(br => br.name.toUpperCase() == name.toUpperCase());
    if (brawlers_filtered.length == 1) {
      let b: Brawler = brawlers_filtered[0];
      this.player.addBrawler(b);
      return true;
    }
    return false;
  }

  /**
   * Add brawler from typing it direclty in UI
   * @param event 
   */
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    let added = false;
    // Add our brawler
    if (value) {
      added = this.addBrawler(value);
    }
    if (added) {
      // Clear the input value
      this.ui_brawler = '';
      event.chipInput!.clear();
    }
  }

  /**
   * Remove brawler from clicking UI
   * @param name 
   */
  remove(name: string): void {
    this.clickRemoveBrawler(name);
  }

  /**
   * Add brawler from clicking the autocompletion UI
   * @param event 
   */
  selected(event: MatAutocompleteSelectedEvent): void {
    let added = this.addBrawler(event.option.viewValue);
    if (added) {
      this.ui_brawler = '';
    }
  }

}
