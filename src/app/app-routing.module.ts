import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { AddpatientComponent } from './admin/patient/addpatient/addpatient.component';
import { ViewpatientComponent } from './admin/patient/viewpatient/viewpatient.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { BarangayComponent } from './admin/barangay/barangay.component';
import { ManagepatientComponent } from './admin/managepatient/managepatient.component';

import { DashboardComponent } from './user/dashboard/dashboard.component';
import { BarangaycontactComponent } from './admin/barangaycontact/barangaycontact.component';
import { AboutComponent } from './user/about/about.component';
import { PreventionComponent } from './user/prevention/prevention.component';
import { SymptomsComponent } from './user/symptoms/symptoms.component';
import { HotlinesComponent } from './user/hotlines/hotlines.component';
import { SearchpatientsComponent } from './user/searchpatients/searchpatients.component';
import { AuthGuard } from './service/auth.guard';

import { ResourcesComponent } from './user/resources/resources.component';

const routes: Routes = [
  { path: '', redirectTo: 'user/dashboard', pathMatch: 'full' },
  {
    path: 'login', component: LoginComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'admin/patient/viewpatient', component: ViewpatientComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/admindashboard', component: AdmindashboardComponent,
    canActivate: [AuthGuard]
  },

  { path: 'admin/managepatient', canActivate: [AuthGuard], component: ManagepatientComponent },
  { path: 'admin/contact', canActivate: [AuthGuard], component: BarangaycontactComponent },
  // { path: 'admin/patient/viewpatient', component: ViewpatientComponent },
  // { path: 'admin/admindashboard', component: AdmindashboardComponent },
  // { path: 'admin/managepatient', component: ManagepatientComponent },
  // { path: 'admin/contact', component: BarangaycontactComponent },

  { path: 'user/dashboard', component: DashboardComponent },
  { path: 'user/about', component: AboutComponent },
  { path: 'user/prevention', component: PreventionComponent },
  { path: 'user/symptoms', component: SymptomsComponent },
  { path: 'user/emergency', component: HotlinesComponent },
  { path: 'user/searchpatient', component: SearchpatientsComponent },
  { path: 'user/resources', component: ResourcesComponent }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
