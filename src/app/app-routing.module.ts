import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {WatchVideoComponent} from './components/watch-video/watch-video.component';
import {DemoTableComponent} from './components/demo-table/demo-table.component';

const router: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'watch/:id', component: WatchVideoComponent},
  {path: 'demo-table', component: DemoTableComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
