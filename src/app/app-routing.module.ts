import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CityComponent} from './city/city.component';
import {StationComponent} from './station/station.component';
import {ContratComponent} from './contrat/contrat.component';

const routes: Routes = [
  {path: '', children: [
      {path: 'ville/:id', children: [
          {path: '', component: CityComponent},
          {path: 'stations/:idStation', component: StationComponent}
        ]},
      {path: '', component: ContratComponent}
    ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
