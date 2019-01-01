import {Component, OnInit} from '@angular/core';
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
import {fromLonLat} from 'ol/proj';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';
import Overlay from 'ol/Overlay.js';

declare var $: any;

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {

  station_ref: StationsModel;
  stations_ok: Observable<StationsModel[]>;
  stations: StationsModel[];
  id_ref: number;
  map: any;
  private vectorLayer: VectorLayer;
  private popup: Overlay;

  constructor(private route: ActivatedRoute, private service: JcdecauxService) {
  }

  ngOnInit() {
    console.log('ng intit station component');
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: 'map',
    });
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log('id : ' + params.get('id'));
        return this.service.getStations(params.get('id'));
      })
    ).subscribe(
      stations => {
        this.stations = stations;
        this.createMap();
      },
      error => {
        console.log('error stations : ' + error.toString());
      }
    );

    this.route.params.subscribe(param => {
        this.id_ref = param.idStation;
        this.createMap();
      }
    );
  }
  private createMap() {
    if (this.id_ref && this.stations) {
      this.map.removeLayer(this.vectorLayer);
      console.log('id ref : ' +  this.id_ref);
      this.station_ref = this.stations.find((station) => station.number == this.id_ref);
      console.log(this.station_ref);
      console.log(this.stations.find((station) => station.number > 0));
      const ok: StationsModel[] = StationsModel.getStationsProche(this.stations, this.station_ref);
      this.stations_ok = of(ok);
      console.log(this.stations_ok);
      const self = this;
      const iconFeature: Feature[] = [new Feature({
        geometry: new Point(fromLonLat([this.station_ref.position.lng, this.station_ref.position.lat])),
        name: this.station_ref.name,
        type: 'ref',
        description: `${this.station_ref.name}<br>place libre : ${this.station_ref.available_bike_stands}
<br> velo libre ${this.station_ref.available_bikes}`
      })];
      ok.forEach(function (station) {
        if (self.station_ref.number !== station.number) {
          iconFeature.push(
            new Feature({
              geometry: new Point(fromLonLat([station.position.lng, station.position.lat])),
              name: station.name,
              type: 'foo',
              description: `${station.name}<br>place libre : ${station.available_bike_stands} <br> velo libre ${station.available_bikes}`
            })
          );
        }
      });
      const vectorSource = new VectorSource({
        features: iconFeature
      });


      const styles = {
        'ref': new Style({
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({color: 'green'}),
            stroke: new Stroke({
              color: 'white', width: 2
            })
          })
        }),
        'foo': new Style({
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({color: 'black'}),
            stroke: new Stroke({
              color: 'white', width: 2
            })
          })
        })
      };
      this.vectorLayer = new VectorLayer({
        source: vectorSource,
        style: function (feature) {
          return styles[feature.get('type')];
        }
      });
      this.map.addLayer(this.vectorLayer);
      this.map.setView(new View({
        center: fromLonLat([this.station_ref.position.lng, this.station_ref.position.lat]),
        zoom: 15
      }));
      const element = document.getElementById('popup');

      this.popup = new Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -50]
      });
      this.map.addOverlay(this.popup);

      this.map.on('click', function (evt) {
        const feature = self.map.forEachFeatureAtPixel(evt.pixel,
          function (feat) {
            return feat;
          });
        if (feature) {
          const coordinates = feature.getGeometry().getCoordinates();
          self.popup.setPosition(coordinates);
          $(element).popover('dispose');
          $(element).popover({
            placement: 'top',
            html: true,
            content: feature.get('description')
          });
          $(element).popover('show');
        } else {
          $(element).popover('dispose');
        }
      });
    }
  }
}
