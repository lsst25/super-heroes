import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Hero} from "../../../models/hero.model";

@Component({
  selector: 'app-search-output',
  templateUrl: './search-output.component.html',
  styleUrls: ['./search-output.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchOutputComponent implements OnInit {
  @Input() output: Hero[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
