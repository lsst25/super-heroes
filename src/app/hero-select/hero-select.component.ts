import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-select',
  templateUrl: './hero-select.component.html',
  styleUrls: ['./hero-select.component.css']
})
export class HeroSelectComponent implements OnInit {

  searchPattern = /^\w+$/;

  constructor() { }

  ngOnInit(): void {
  }

}
