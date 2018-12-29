export class UrlBuilder {
  constructor(private url: string, private key: string) {
  }

  getUrlForGetContract(): string {
    return `${this.url}/vls/v1/contracts?apiKey=${this.key}`;
  }

  getUrlForGetStations(contrats: string) {
    return `${this.url}/vls/v1/stations?apiKey=${this.key}&contract=${contrats}`;
  }
}
