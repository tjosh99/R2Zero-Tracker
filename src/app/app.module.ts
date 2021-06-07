import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgHttpLoaderModule } from 'ng-http-loader';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { LoginComponent } from './login/login.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { BarangayComponent } from './admin/barangay/barangay.component';
import { AddpatientComponent } from './admin/patient/addpatient/addpatient.component';
import { ViewpatientComponent } from './admin/patient/viewpatient/viewpatient.component'; 
import { ManagepatientComponent } from './admin/managepatient/managepatient.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { NavbarComponent } from './user/navbar/navbar.component';
import { FooterComponent } from './user/footer/footer.component';
import { BarangaycontactComponent } from './admin/barangaycontact/barangaycontact.component';
import { AboutComponent } from './user/about/about.component';
import { PreventionComponent } from './user/prevention/prevention.component';
import { SymptomsComponent } from './user/symptoms/symptoms.component';
import { HotlinesComponent } from './user/hotlines/hotlines.component';
import { SearchpatientsComponent } from './user/searchpatients/searchpatients.component';
import { ResourcesComponent } from './user/resources/resources.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdmindashboardComponent,
    BarangayComponent,
    AddpatientComponent,
    ViewpatientComponent,
    ManagepatientComponent,
    DashboardComponent,
    NavbarComponent,
    FooterComponent,
    BarangaycontactComponent,
    AboutComponent,
    PreventionComponent,
    SymptomsComponent,
    HotlinesComponent,
    SearchpatientsComponent,
    ResourcesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgHttpLoaderModule.forRoot(),
    NgxPaginationModule,   
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
