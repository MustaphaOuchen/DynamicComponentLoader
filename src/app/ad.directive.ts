import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[adHost]',
})
export class AdDirective {

  //With the viewContainerRef we get access to the component which will be injected
  constructor(public viewContainerRef: ViewContainerRef) { }
}

