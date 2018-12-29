export class StationsModel {
  public lat_rad: number;
  public lng_rad: number;
  constructor(public number: number, public contract_name: string, public name: string, public address: string,
              public position: {lat: number, lng: number}, public banking: boolean, public bonus: boolean,
              public bike_stands: number, public available_bike_stands: number, public available_bikes: number,
              public status: string, public last_update: number) {
  }


  static getDistanceFromStations(a: StationsModel, b: StationsModel): number {
    a.lat_rad = (a.position.lat * Math.PI) / 180;
    a.lng_rad = (a.position.lng * Math.PI) / 180;
    b.lat_rad = (b.position.lat * Math.PI) / 180;
    b.lng_rad = (b.position.lng * Math.PI) / 180;


    const dist: number = Math.acos(Math.sin(a.lat_rad) * Math.sin(b.lat_rad) + Math.cos(a.lat_rad) *
      Math.cos(b.lat_rad) * Math.cos(a.lng_rad - b.lng_rad)) * 60 * 1.852 * 180 / Math.PI;
    console.log('distance ' + this.name + ' à ' + a.name + ' : ' + dist);
    return dist;
  }

  static  getStationsProche(a: StationsModel[], b: StationsModel): StationsModel[] {
    const newList: StationsModel[] = [];
    a.forEach(function (station) {
      if (StationsModel.getDistanceFromStations(station, b) < 0.5) {
        newList.push(station);
      }
    });
    return newList;
  }
}
