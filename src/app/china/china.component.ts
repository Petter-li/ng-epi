import { Component, OnInit } from '@angular/core';

import { Result } from './Result';
import { EpiService } from '../service/epi.service';

@Component({
  selector: 'app-china',
  styles : [`
    :host {
        width: 100%;
    }
 `],
  templateUrl: './china.component.html',
  styleUrls: ['./china.component.less']
})
export class ChinaComponent implements OnInit {

  result: Result;

  area: [];

  constructor(private epiService: EpiService) { }

  ngOnInit() {
    this.getEpi();
  }

  getEpi() {
    this.epiService.searchEpi()
    .subscribe(response => {
      console.log(response);
      this.result = response.data;
      this.area = response.data.area;
    });
  }

}
