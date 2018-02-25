import { Component, State } from '@stencil/core';


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  @State() active_conversion_list = [];
  active_conversion: string = '';
  active_base_currency: string = '';
  active_other_currency: string = '';

  zar_idr_base: number = 1185.10;
  idr_zar_base: number = 0.00085;

  constructor() {
    this.convertZarToIdr();
    this.convertIdrToZar();

    this.setActiveConversion('zar_idr');
  }

  private convertZarToIdr() {
    let multipliers = [10, 20, 50, 100, 200, 250, 500, 1000, 1500, 2000, 2500, 3000];
    this.createList(this.zar_idr_base, multipliers);
  }

  private convertIdrToZar() {
    let multipliers = [10000, 20000, 50000, 100000, 200000, 250000, 500000, 1000000, 1500000, 2000000, 2500000, 3000000];
    this.createList(this.idr_zar_base, multipliers);
  }

  private createList(base, multipliers) {
    this.active_conversion_list = [];
    multipliers.forEach(multiplier => {
      this.active_conversion_list.push({
        base: AppHome.formatCurrency(multiplier),
        other: AppHome.formatCurrency(multiplier * base)
      });
    });
  }

  private setActiveConversion(conversion) {
    this.active_conversion = conversion;

    switch (this.active_conversion) {
      case 'zar_idr':
        this.active_base_currency = 'ZAR';
        this.active_other_currency = 'IDR';
        this.convertZarToIdr();
      break;

      case 'idr_zar':
        this.active_base_currency = 'IDR';
        this.active_other_currency = 'ZAR';
        this.convertIdrToZar();
      break;
    }
  }

  private swap() {
    switch (this.active_conversion) {
      case 'zar_idr':
        this.setActiveConversion('idr_zar');
        break;

      case 'idr_zar':
        this.setActiveConversion('zar_idr');
        break;
    }
  }

  private static formatCurrency(value) {
    return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ');
  }

  render() {
    return (
      <ion-page>
        <ion-header>
          <ion-toolbar color='dark'>
            <ion-title>Currency Converter</ion-title>
            <ion-buttons slot="end">
              <ion-button onClick={() => this.swap()}>
                <ion-icon name='swap'></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content>

          <ion-grid>

            <ion-row>
              <ion-col class="dark" col-6>{this.active_base_currency}</ion-col>
              <ion-col class="light" col-6>{this.active_other_currency}</ion-col>
            </ion-row>

          {this.active_conversion_list.map(conversion => {
            return <ion-row>
              <ion-col class="dark" col-6>{conversion.base}</ion-col>
              <ion-col class="light" col-6>{conversion.other}</ion-col>
            </ion-row>;
          })}

          </ion-grid>

        </ion-content>
      </ion-page>
    );
  }
}
