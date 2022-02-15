import {animate, state, style, transition, trigger} from "@angular/animations";

export const loadingTrigger = [
  trigger('rotation',[
    state('start',style({
      transform: 'rotate(0deg)'
    })),
    state('end', style({
      transform: 'rotate(360deg)'
    })),
    transition('start => end', animate(1500)),
    transition('end => start', animate(0)),
  ]),
];


