import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss'],
})
export class UsageComponent implements OnInit {
  public data: any;
  public isLoading: any = true;
  public columns: any;
  public rows: any;

  constructor(
    private dataService: DataService,
    private toastController: ToastController
  ) {
    this.columns = [
      { name: 'Date' },
      { name: 'Input Type' },
      { name: 'Reading' },
    ];
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Success: Reading entry removed',
      duration: 1500,
      position: 'top',
      icon: 'thumbs-up-outline',
      color: 'success',
    });

    await toast.present();
  }

  ngOnInit() {
    this.getData();
  }

  //firestore data call
  getData() {
    this.dataService.getReading().subscribe((res) => {
      this.rows = res;
      this.data = res;
      this.isLoading = false;
    });
  }

  deleteData(row: any) {
    this.dataService.deleteReading(row.id);
  }
}
