import { Component, OnInit } from '@angular/core';
import { topcard, createTopCards } from './top-cards-data';
import { TestCasesService } from '../../../services/test-cases.service';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html',
})
export class TopCardsComponent implements OnInit {
  topcards: topcard[] = [];

  constructor(private testCasesService: TestCasesService) {}

  ngOnInit(): void {
    this.testCasesService.getTotalTestCases().subscribe((total) => {
      this.testCasesService.getTotalSmokeTests().subscribe((totalSmoke) => {
        this.testCasesService.getTotalRegressionTests().subscribe((totalRegression) => {
          this.testCasesService.getTotalFunctionalFeatureTests().subscribe((totalFunctionalFeatureTest) => {
            this.topcards = createTopCards(total, totalSmoke, totalRegression, totalFunctionalFeatureTest);
          });
        });
      });
    });
  }
}
