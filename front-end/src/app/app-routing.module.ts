import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { AccountComponent } from './pages/account/account.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ContentComponent } from './pages/content/content.component';
import { HomePriComponent } from './pages/home-pri/home-pri.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MyalgorithmsComponent } from './pages/myalgorithms/myalgorithms.component';
import { MycasesComponent } from './pages/mycases/mycases.component';
import { SigninComponent } from './pages/signin/signin.component';
import { TreatmentComponent } from './pages/treatment/treatment.component';
import { UploadalgorithmComponent } from './pages/uploadalgorithm/uploadalgorithm.component';
import { UploadcaseComponent } from './pages/uploadcase/uploadcase.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path:'signin', component:SigninComponent},
  {path:'login', component:LoginComponent},
  {path:'private', component:HomePriComponent, canActivate: [AuthGuard]},
  {path:'mycases', component:MycasesComponent, canActivate: [AuthGuard]},
  {path:'myalgorithms', component:MyalgorithmsComponent, canActivate: [AuthGuard]},
  {path:'uploadalgorithm', component:UploadalgorithmComponent, canActivate: [AuthGuard]},
  {path:'uploadcase', component:UploadcaseComponent, canActivate: [AuthGuard]},
  {path:'treatment', component:TreatmentComponent, canActivate: [AuthGuard]},
  {path:'account', component:AccountComponent, canActivate: [AuthGuard]},
  {path:'content', component:ContentComponent},
  {path:'admin', component: AdminComponent},// canActivate: RoleGuard, data: { expectedRole: 'admin' }},
  {path: '**', redirectTo:'' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
