import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CostsComponent } from './costs/costs.component';
import { ItemsComponent } from './items/items.component';
import { SettingsComponent } from './settings/settings.component';
import { SubmitReadingComponent } from './submit-reading/submit-reading.component';
import { UsageComponent } from './usage/usage.component';

import { ViewsPage } from './views.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/views/submit-reading',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ViewsPage,
    children: [
      { path: 'usage', component: UsageComponent },
      { path: 'costs', component: CostsComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'about', component: AboutComponent },
      { path: 'submit-reading', component: SubmitReadingComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsPageRoutingModule {}
