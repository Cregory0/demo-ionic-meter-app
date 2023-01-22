import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public energyRate: any;
  public standingChargeRate: any;
  public isLoading: any = true;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getSettings().subscribe((res) => {
      this.energyRate = res[1];
      this.standingChargeRate = res[0];
      this.isLoading = false;
    });
  }
}
