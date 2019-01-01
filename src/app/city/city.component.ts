import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
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
  contrat: string;
  choix: string;

  constructor(private route: ActivatedRoute, private service: JcdecauxService, private router: Router) {
  }

  ngOnInit() {
    console.log('ng init city composant');
    this.stations = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.service.getStations(params.get('id'));
      })
    );
    this.route.params.subscribe(param => {
        this.contrat = param.id;
      }
    );
    this.route.params.subscribe(param => {
        if (param.idStation) {
          this.choix = param.idStation;
        }
      }
    );
  }

  validation() {
    console.log(this.choix);
    if (this.choix) {
      this.router.navigate(['ville', this.contrat, 'stations', this.choix]);
    }
  }
}
