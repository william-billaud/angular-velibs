import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {JcdecauxService} from '../jcdecaux.service';
import {StationsModel} from '../stations-model';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  stations: Observable<StationsModel[]>;

  constructor(private route: ActivatedRoute, private service: JcdecauxService) {
  }
  ngOnInit() {
    console.log('ng init city composant');
    this.stations = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log('id : ' + params.get('id'));
      return  this.service.getStations(params.get('id'));
      })
    );
  }

}
