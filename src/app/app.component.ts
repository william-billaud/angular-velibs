import {Component, OnInit} from '@angular/core';
import {JcdecauxService} from './jcdecaux.service';
import {ContratsModel} from './contrats-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-velibs';
  constructor() {
  }

  ngOnInit() {
  }


}
