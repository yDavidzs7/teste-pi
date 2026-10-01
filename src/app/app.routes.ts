import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProdutosComponent } from './pages/produtos/produtos';
import { LoginComponent } from './pages/login/login';



export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '' },
];
