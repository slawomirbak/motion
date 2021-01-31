import { Component, OnInit } from '@angular/core';
import { AbstractHttpService } from './services/abstract-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'MotionSPA';

  constructor(private abstract: AbstractHttpService) {}
  ngOnInit(): void {
    this.abstract.getTest().subscribe(data => {
      console.log(data);
    })
  }
}
