import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ContratsModel} from './contrats-model';
import {UrlBuilder} from './url-builder';
import {environment} from '../environments/environment';
import {StationsModel} from './stations-model';

@Injectable({
  providedIn: 'root'
})
export class JcdecauxService {
  urlBuilder: UrlBuilder;

  constructor(private http: HttpClient) {
    this.urlBuilder = new UrlBuilder(environment.JCDDECAUX_API_ROOT, environment.JCDECAUX_API_key);
  }

  public getContrats(): Observable<ContratsModel[]> {
    return this.http.get<ContratsModel[]>(this.urlBuilder.getUrlForGetContract());
  }

  public getStations(contrats: string): Observable<StationsModel[]> {
    return this.http.get<StationsModel[]>(this.urlBuilder.getUrlForGetStations(contrats));
  }
}

