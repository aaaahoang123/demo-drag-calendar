import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {WatchVideoComponent} from './watch-video/watch-video.component';

const router: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'watch/:id', component: WatchVideoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
