import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FullComponent } from './layouts/full/full.component';
import { ReportsComponent } from './component/reports/reports.component';
import { UserProfileComponent } from '../app/component/user-profile/user-profile.component';
import { NewTestCycleComponent } from './component/reports/new-test-cycle/new-test-cycle.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'new-test-cycle',
        component: NewTestCycleComponent
      },

      {
        path: 'component',
        loadChildren: () =>
          import('./component/component.module').then(
            (m) => m.ComponentsModule
          ),
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
  {
    path: 'register',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(Approutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
