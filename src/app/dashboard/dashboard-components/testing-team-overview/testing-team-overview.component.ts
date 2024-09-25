import { Component, OnInit } from '@angular/core';
import {Product,TopSelling} from './testing-team-overview-data';

@Component({
  selector: 'app-top-selling',
  templateUrl: './testing-team-overview.component.html'
})
export class TestingTeamOverviewComponent implements OnInit {

  topSelling:Product[];

  constructor() {

    this.topSelling=TopSelling;
  }

  ngOnInit(): void {
  }

}
