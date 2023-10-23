import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-submit-reading',
    templateUrl: './submit-reading.component.html',
    styleUrls: ['./submit-reading.component.scss'],
})
export class SubmitReadingComponent implements OnInit {
    submitReading = this.fb.group({
        reading: [''],
        inputType: [''],
        date: [''],
    });

    errorMessage: string = 'no message';

    constructor(
        public fb: FormBuilder,
        private dataService: DataService,
        private toastController: ToastController
    ) {}

    async presentToast(
        position: 'top' | 'middle' | 'bottom',
        message: 'Reading Removed' | 'Success: New reading entry added',
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

    ngOnInit() {}

    onSubmit() {
        let inputData = this.submitReading.value;
        this.dataService
            .addReading({
                reading: inputData.reading,
                inputType: inputData.inputType,
                date: inputData.date,
            })
            .then(() => {
                this.submitReading.reset();
            });
    }
}
