import { Component, EventEmitter, Output } from '@angular/core';

export type Letters =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';

@Component({
  selector: 'app-alphabetical',
  templateUrl: './alphabetical.component.html',
  styleUrls: ['./alphabetical.component.css'],
})
export class AlphabeticalComponent {
  @Output() readonly letter = new EventEmitter<Letters>();

  selectedLetter: Letters = 'a';
  alphabet: Letters[] = 'abcdefghijklmnopqrstuvwxyz'.split('') as Letters[];
  opened = false;

  selectLetter(letter: Letters): void {
    this.selectedLetter = letter;
  }

  onSelectClick(letter: Letters): void {
    this.selectedLetter = letter;
    this.letter.emit(letter);
    this.opened = !this.opened;
  }

  onOpenClick(): void {
    this.opened = !this.opened;
  }
}
