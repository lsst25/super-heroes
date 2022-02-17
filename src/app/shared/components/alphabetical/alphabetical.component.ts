import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {letters, Letter} from "../../../models/letters.model";

@Component({
  selector: 'app-alphabetical',
  templateUrl: './alphabetical.component.html',
  styleUrls: ['./alphabetical.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlphabeticalComponent {
  @Output() readonly letter = new EventEmitter<Letter>();

  selectedLetter: Letter = 'a';
  alphabet: Letter[] = letters;
  opened = false;

  selectLetter(letter: Letter): void {
    this.selectedLetter = letter;
  }

  onSelectClick(letter: Letter): void {
    this.selectedLetter = letter;
    this.letter.emit(letter);
    this.opened = !this.opened;
  }

  onOpenClick(): void {
    this.opened = !this.opened;
  }
}
