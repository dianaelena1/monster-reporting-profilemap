import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardComponent } from './dashboard.component';
import { TestcasesRatioComponent } from './dashboard-components/testcases-ratio/testcases-ratio.component';
import { NotificationsComponent } from './dashboard-components/notifications/notifications.component';
import { TestingTeamOverviewComponent } from './dashboard-components/testing-team-overview/testing-team-overview.component';
import { TopCardsComponent } from './dashboard-components/top-cards/top-cards.component';
import { BlogCardsComponent } from './dashboard-components/blog-cards/blog-cards.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dashboard',
      urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Dashboard' }],
    },
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [
    NotificationsComponent,
    BlogCardsComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgApexchartsModule,
  ],
  declarations: [
    DashboardComponent,
    TestcasesRatioComponent,
    TestingTeamOverviewComponent,
    TopCardsComponent,
  ],
})
export class DashboardModule {}
