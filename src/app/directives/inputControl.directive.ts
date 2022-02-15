import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {NgControl} from "@angular/forms";


@Directive({
  selector: '[inputControlDirective]'
})
export class InputControlDirective{

  constructor(private elementRef: ElementRef, private control : NgControl){

  }

  @HostListener("input",  ['$event'] ) onInput(e:any) {
    e.target.value = e.target.value.replaceAll(' ','');
  }
}

