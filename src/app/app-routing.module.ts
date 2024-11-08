import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BienComponent } from './bien/bien.component';
import { AdminBiensComponent } from './admin-biens/admin-biens.component';
const routes: Routes = [
  { path: 'biens', component: BienComponent },
  { path: 'admin/biens', component: AdminBiensComponent },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
