import {Component, OnInit} from '@angular/core';
import {JcdecauxService} from '../jcdecaux.service';
import {ContratsModel} from '../contrats-model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css']
})
export class ContratComponent implements OnInit {

  choix: string;
  contratsArray: ContratsModel[];

  constructor(private route: ActivatedRoute, private jcdecauxservice: JcdecauxService, private router: Router) {
  }

  ngOnInit() {
    this.getContractList();
    this.route.params.subscribe(param => {
        if (param.id) {
          this.choix = param.id;
        }
      }
    );
  }

  private getContractList(): void {
    this.jcdecauxservice.getContrats().subscribe(
      val => {
        this.contratsArray = val;
      },
      error => {
        console.log('error ' + error.toString());
      }
    );
  }

  validation() {
    console.log(this.choix);
    if (this.choix) {
      this.router.navigate(['ville', this.choix]);
    }
  }
}
