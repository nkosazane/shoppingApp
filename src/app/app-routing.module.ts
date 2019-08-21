import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'item', loadChildren: './page/item/item.module#ItemPageModule' },
  { path: 'edit', loadChildren: './page/edit/edit.module#EditPageModule' },
  { path: 'login', loadChildren: './page/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './page/register/register.module#RegisterPageModule' },
  { path: 'dashboard', loadChildren: './page/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'phone', loadChildren: './page/phone/phone.module#PhonePageModule' },
  { path: 'facebook', loadChildren: './page/facebook/facebook.module#FacebookPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
