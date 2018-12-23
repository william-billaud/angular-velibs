export class UrlBuilder {
  constructor(private url: string, private key: string) {
  }

  getUrlForGetContract(): string {
    return `${this.url}/vls/v1/contracts?apiKey=${this.key}`;
  }

}
