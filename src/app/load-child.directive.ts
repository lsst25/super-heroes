import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[adHost]'
})
export class LoadChildDirective {

  constructor(public viewContainerRef: ViewContainerRef) {}

}
