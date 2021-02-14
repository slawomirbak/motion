import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeRoutesModule } from './home.router.module';



@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomeRoutesModule
  ]
})
export class HomeModule { }
