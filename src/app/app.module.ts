import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChinaComponent } from './china/china.component';
import { MapComponent } from './components/map/map.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
   declarations: [
      AppComponent,
      ChinaComponent,
      MapComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      NgxEchartsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
