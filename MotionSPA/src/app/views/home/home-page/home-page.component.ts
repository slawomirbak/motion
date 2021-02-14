import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TricksService } from 'src/app/services/tricky.service';
import { ITrick } from 'src/app/core/models/ITrick'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  title = 'MotionSPA';
  tricks$ = this.tricksService.tricks$;
  trickForm?: FormGroup;

  constructor(private tricksService: TricksService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.trickForm = this.formBuilder.group({
      trick: ['']
    });
  }
  saveTrick = (event: Event): void => {
    event.preventDefault();
    event.stopPropagation();

    const trick: ITrick = {
      id: 0,
      name: this.trickForm?.controls['trick'].value
    };

    console.log(trick)

    this.tricksService.post(trick).subscribe(x => console.log(x));
  }
}
