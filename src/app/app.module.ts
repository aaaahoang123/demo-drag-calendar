import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { WatchVideoComponent } from './components/watch-video/watch-video.component';
import { BigScreenNavbarComponent } from './components/big-screen-navbar/big-screen-navbar.component';
import { MobileScreenNavbarComponent } from './components/mobile-screen-navbar/mobile-screen-navbar.component';
import { DemoTableComponent } from './components/demo-table/demo-table.component';
import { NgInitDirective } from './directives/ng-init.directive';
import { DemoTableTdComponent } from './components/demo-table/demo-table-td/demo-table-td.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    WatchVideoComponent,
    BigScreenNavbarComponent,
    MobileScreenNavbarComponent,
    DemoTableComponent,
    NgInitDirective,
    DemoTableTdComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
