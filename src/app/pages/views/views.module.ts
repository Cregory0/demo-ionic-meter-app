import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ViewsPageRoutingModule } from './views-routing.module';

import { ViewsPage } from './views.page';

import { SubmitReadingComponent } from './submit-reading/submit-reading.component';
import { UsageComponent } from './usage/usage.component';
import { CostsComponent } from './costs/costs.component';
import { ItemsComponent } from './items/items.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewsPageRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    ViewsPage,
    SubmitReadingComponent,
    UsageComponent,
    CostsComponent,
    ItemsComponent,
    SettingsComponent,
    AboutComponent,
  ],
})
export class ViewsPageModule {}
