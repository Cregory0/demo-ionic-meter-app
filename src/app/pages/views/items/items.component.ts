import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { DataService } from 'src/app/services/data.service';
import { Item } from 'src/app/interfaces/Item';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  public items: any;
  public isLoading: any = true;
  public energyRates: any = 35.056;
  public energyUsage: any;
  public costs: any;
  public item: Item;
  public itemArray: any = [];
  public name: string;
  public watts: number;
  public hours: number;

  constructor(
    private dataService: DataService,
    private toastController: ToastController,
  ) {}

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(
      { name: this.name, watts: this.watts, hours: this.hours },
      'confirm'
    );
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.itemArray = ev.detail.data;
      this.dataService.addItem(this.itemArray);
    }
  }

  async presentToast(
    position: 'top' | 'middle' | 'bottom',
    message: 'Item Removed' | 'Item Added',
    icon: 'thumbs-up-outline' | 'thumbs-down-outline',
    color: 'success' | 'danger'
  ) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      icon: icon,
      color: color,
    });

    await toast.present();
  }

  ngOnInit() {
    this.getItem();
  }

  /**
   * Firestore integration
   *
   * @param {Object} item
   */

  getItem() {
    this.dataService.getItem().subscribe((res) => {
      res.reverse();
      this.items = res;
      this.isLoading = false;
    });
  }

  deleteItem(item) {
    this.dataService.deleteItem(item);
  }

  updateItem(item) {
    this.dataService.updateItem(item);
  }

  /**
   * Calculate costs
   *
   * @param {number} watt
   * @param {number} hours
   * @param {number} rates
   * @param {number} usage
   * @returns {number} result
   */

  calculateEnergy(watt: number, hours: number) {
    let result = (watt * hours) / 1000;
    return result;
  }

  calculateCost(rates: number, usage: number) {
    let result = Math.round(rates * usage) / 100;
    return result.toFixed(2);
  }

}
