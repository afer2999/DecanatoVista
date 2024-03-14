import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autor-slider',
  templateUrl: './autor-slider.component.html',
  styleUrls: ['./autor-slider.component.css']
})
export class AutorSliderComponent implements OnInit {

  constructor() {
    console.log(localStorage.getItem('loginCedula'))
  }

  ngOnInit(): void {
  }

}
