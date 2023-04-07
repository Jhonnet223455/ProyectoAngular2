import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { VerifyMailComponent } from './components/verify-mail/verify-mail.component';
import { RecoverPassComponent } from './components/recover-pass/recover-pass.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '' , redirectTo: "/login", pathMatch: "full"},
  { path: 'login', component: LoginComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'verify-mail', component: VerifyMailComponent },
  { path: 'recover-pass', component: RecoverPassComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**' , redirectTo: "/login", pathMatch: "full"},

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
