import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
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

    isDarkMode: boolean = window.matchMedia('(prefers-color-scheme: dark)')
        .matches;

    @HostListener('window:matchMedia', ['$event'])
    onMediaChange(event: MediaQueryListEvent) {
        this.isDarkMode = event.matches;
    }

    constructor(
        private dataService: DataService,
        private toastController: ToastController,
        private renderer: Renderer2
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
        this.renderer.addClass(
            document.body,
            this.isDarkMode ? 'dark' : 'material'
        );
        this.watchSystemPreference();
        this.getData();
    }

    private watchSystemPreference() {
        const darkModeMediaQuery = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );
        darkModeMediaQuery.addEventListener('change', (e) => {
            this.isDarkMode = e.matches;
            if (this.isDarkMode) {
                this.renderer.removeClass(document.body, 'material');
                this.renderer.addClass(document.body, 'dark');
            } else {
                this.renderer.removeClass(document.body, 'dark');
                this.renderer.addClass(document.body, 'material');
            }
        });
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
        this.getData();
    }
}
