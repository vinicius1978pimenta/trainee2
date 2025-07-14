import { Routes } from '@angular/router';
import { HomeCrudComponent } from './components/home-crud/home-crud.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';


export const routes: Routes = [
  { path: '', component: HomeCrudComponent },
  {path : 'creat', component: FormUserComponent},
  {path : 'user', component : ListUserComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
