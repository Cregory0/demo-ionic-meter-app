import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.scss'],
})
export class CostsComponent implements OnInit {

  // Variables
  public electricityRates: any = {}
  public energyCharge: any;
  public standingCharge: any;
  public energyUsage: any;
  public dateDifference: any;
  public cost: any;
  public vat: any;
  public totalCost: any;
  public reading: any;
  public isLoading: any = true;
  public firstDate: any;
  public secondDate: any;
  public datas: any;
  public selectedData: any;
  public firstOption: any;
  public secondOption: any;

  // Get date information
  date = new Date();
  month = this.date.toLocaleString('default', { month: 'long' });

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getElectricityRates();
    this.getData();
  }

  // firestore data call

  getElectricityRates = () => {
    this.dataService.getSetting().subscribe((res) => {
    this.electricityRates = {
      energyRate: res[0].energyRate,
      standingChargeRate: res[0].standingChargeRate
    }
  });
}

  getData() {
    this.dataService.getReading().subscribe((res) => {
      this.datas = res;
      this.reading = [res[0], res[1]];
      this.renderData();
      this.isLoading = false;
    });
  }

  // Renders data after API updates with current information

  async renderData() {
    this.updateDates();
    this.daysBetween(this.firstDate, this.secondDate);
    this.dayRateCalc(this.electricityRates.standingChargeRate);
    this.updateEnergy(this.reading[0].reading, this.reading[1].reading);
    this.energyCalc(this.electricityRates.energyRate, this.energyUsage);
    this.costCalc(this.standingCharge, this.energyCharge);
    this.vatCalc(this.cost);
    this.totalCostCalc(this.cost, this.vat);
  }

  // Functions

  dayRateCalc(standingCharge: any) {
    this.standingCharge =
      Math.round(standingCharge * this.dateDifference) / 100;
    return this.standingCharge;
  }

  energyCalc(energyRate: any, energyUsage: any) {
    this.energyCharge = Math.round(energyRate * energyUsage) / 100;
    return this.energyCharge;
  }

  costCalc(standingCharge: any, energyCharge: any) {
    this.cost = this.standingCharge + this.energyCharge;
  }

  vatCalc(cost: any) {
    this.vat = 0.05 * this.cost;
    this.vat = Math.round(this.vat * 100) / 100;
    return this.vat;
  }

  totalCostCalc(cost: any, vat: any) {
    this.totalCost = this.cost + this.vat;
    return this.totalCost;
  }

  daysBetween(date1: any, date2: any) {
    let wholeDay = 1000 * 60 * 60 * 24;
    let difference = Math.abs(date1 - date2);
    this.dateDifference = Math.round(difference / wholeDay);
    return this.dateDifference;
  }

  updateDates() {
    this.firstDate = new Date(this.reading[1].date);
    this.secondDate = new Date(this.reading[0].date);
  }

  updateEnergy(readingOne: any, readingTwo: any) {
    this.energyUsage = readingOne - readingTwo;
  }

  updateCosts() {
    this.daysBetween(
      new Date(this.secondOption.date),
      new Date(this.firstOption.date)
    );
    this.dayRateCalc(this.electricityRates.standingChargeRate);
    this.updateEnergy(this.firstOption.reading, this.secondOption.reading);
    this.energyCalc(this.electricityRates.energyRate, this.energyUsage);
    this.costCalc(this.standingCharge, this.energyCharge);
    this.vatCalc(this.cost);
    this.totalCostCalc(this.cost, this.vat);
  }

  eventSelection(event: any) {
    this.selectedData = event.date;
  }
}
