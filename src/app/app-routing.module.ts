import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CityComponent} from './city/city.component';
import {StationComponent} from './station/station.component';

const routes: Routes = [
  {path: 'ville/:id', children: [
      {path: '', component: CityComponent},
      {path: 'stations/:idStation', component: StationComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
