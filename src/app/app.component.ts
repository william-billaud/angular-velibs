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
  contratsArray: ContratsModel[];
  constructor(private jcdecauxservice: JcdecauxService) {
  }

  ngOnInit() {
    console.log('initialisation de l app');
    this.getContractList();
  }

  private getContractList(): void {
    this.jcdecauxservice.getContrats().subscribe(
      val => {
        this.contratsArray = val;
      },
      error => {
        console.log('error ');
      },
      () => console.log('complet!')
    );
  }
}
