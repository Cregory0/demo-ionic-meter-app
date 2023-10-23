import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-views',
  templateUrl: './views.page.html',
  styleUrls: ['./views.page.scss'],
})
export class ViewsPage implements OnInit {
  public appPages = [
    { title: 'Submit Reading', url: 'submit-reading', icon: 'cloud-upload' },
    { title: 'Usage', url: 'usage', icon: 'speedometer' },
    { title: 'Costs', url: 'costs', icon: 'card' },
    { title: 'Items', url: 'items', icon: 'archive' },
    { title: 'Settings', url: 'settings', icon: 'settings' },
    { title: 'About', url: 'about', icon: 'information-circle' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  async logOut() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
