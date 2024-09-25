import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlogCardsComponent } from '../app/dashboard/dashboard-components/blog-cards/blog-cards.component';
import { NgbdpaginationBasicComponent } from '../app/component/pagination/pagination.component';

import { NavigationComponent } from './shared/header/navigation.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { TestCasesService } from './services/test-cases.service';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from '../app/component/user-profile/user-profile.component';
import { NewTestCycleComponent } from '../app/component/reports/new-test-cycle/new-test-cycle.component';

@NgModule({
    declarations: [AppComponent, SpinnerComponent, LoginComponent, UserProfileComponent, NewTestCycleComponent],
    imports: [
        BlogCardsComponent,
        NgbdpaginationBasicComponent,
        NavigationComponent,
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        RouterModule,
    ],

    providers: [
        TestCasesService,
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
