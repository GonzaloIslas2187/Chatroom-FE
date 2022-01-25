import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[messageHost]',
})
export class MessageDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}