import { Component, OnInit } from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {JcdecauxService} from '../jcdecaux.service';
import {StationsModel} from '../stations-model';
import {Observable, of} from 'rxjs';
import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Point from 'ol/geom/Point.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import VectorSource from 'ol/source/Vector.js';
import OSM from 'ol/source/OSM.js';
import { fromLonLat } from 'ol/proj';


@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {

  station_ref: StationsModel;
  stations_ok: Observable <StationsModel[]>;
  stations: Observable <StationsModel[]>;
  map: any;
  constructor(private route: ActivatedRoute, private service: JcdecauxService) { }

  ngOnInit() {
    console.log('ng intit station component');
    this.stations = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log('id : ' + params.get('id'));
        return  this.service.getStations(params.get('id'));
      })
    );
    this.stations.subscribe(
      stations => {
        this.station_ref = stations.find((station) => station.number === (+this.route.snapshot.paramMap.get('idStation')));
        console.log(this.station_ref);
        console.log(stations);
        this.stations_ok = of(StationsModel.getStationsProche(stations, this.station_ref));
        console.log(this.stations_ok);
        this.createMap();
      },
      error => {
        console.log('error stations : ' + error.toString() );
      }
    );
  }

  private createMap() {

    const iconFeature = new Feature({
      geometry: new Point([this.station_ref.position.lng, this.station_ref.position.lat]),
      name: this.station_ref.name
    });

    const vectorSource = new VectorSource({
      features: [iconFeature]
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });


    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: OSM()
        }), vectorLayer
      ],
      view: new View({
          center: fromLonLat([this.station_ref.position.lng, this.station_ref.position.lat]),
        zoom: 15
      })
    });



  }

}
