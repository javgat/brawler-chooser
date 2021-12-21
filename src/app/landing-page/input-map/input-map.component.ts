import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModelMap } from '@javgat/brawlify-api-client-angular';

@Component({
  selector: 'app-input-map',
  templateUrl: './input-map.component.html',
  styleUrls: ['./input-map.component.scss']
})
export class InputMapComponent implements OnInit {

  ui_map: string;
  map_names: string[];
  map_names_autocompletion: string[];

  @Input() maps: ModelMap[];
  
  @Output() newMapSelected = new EventEmitter<ModelMap>();

  sendMapSelection(map: ModelMap) {
    this.newMapSelected.emit(map);
  }

  constructor() {
    this.maps = [];
    this.ui_map = '';
    this.map_names = [];
    this.map_names_autocompletion = [];
  }

  ngOnInit(): void {
  }

  getMapNames(): string[] {
    if (this.map_names.length == 0) {
      this.map_names = this.maps.map(m => m.name);
    }
    return this.map_names;
  }

  updateMapList(): void {
    if (this.ui_map != '') {
      this.map_names_autocompletion = this.getMapNames().filter( (b) => {
        return b != null && b.toUpperCase().includes(this.ui_map.toUpperCase());
      });
    } else {
      this.map_names_autocompletion = this.getMapNames();
    }
  }

  changeInputMap(): void {
    this.updateMapList();
    let mapsFiltered: ModelMap[] = this.maps.filter(m => m.name == this.ui_map);
    console.log(mapsFiltered);
    console.log(this.ui_map);
    if (mapsFiltered.length == 1) {
      let map: ModelMap = mapsFiltered[0];
      this.sendMapSelection(map);
    }
  }

}
