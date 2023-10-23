import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    public electricityRates: any = {};
    public isLoading: any = true;

    constructor(
        private dataService: DataService,
        private toastController: ToastController
    ) {}

    ngOnInit() {
        this.getSettings();
    }

    async presentToast(
        position: 'top' | 'middle' | 'bottom',
        message: 'Reading Removed' | 'Success: Settings updated',
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

    getSettings = () => {
        this.dataService.getSetting().subscribe((res) => {
            this.electricityRates = {
                id: res[0].id,
                energyRate: res[0].energyRate,
                standingChargeRate: res[0].standingChargeRate,
            };
            this.isLoading = false;
        });
    };

    updateSettings() {
        const updatedSettings = {
            id: this.electricityRates.id,
            energyRate: this.electricityRates.energyRate,
            standingChargeRate: this.electricityRates.standingChargeRate,
        };

        this.dataService.updateSetting(updatedSettings).subscribe(() => {
            this.electricityRates = updatedSettings;
        });

        this.presentToast(
            'top',
            'Success: Settings updated',
            'thumbs-up-outline',
            'success'
        );
    }
}
