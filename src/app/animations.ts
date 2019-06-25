import {trigger, style, animate, transition, keyframes, state} from '@angular/animations';

export let fade = trigger('fade', [
  state('void', style({opacity:0})),
  transition(':enter, :leave', [
    animate(2000)
  ])
])

export let slideUp = trigger('slideUp', [
  transition(':enter', [
    style({ transform: 'translateY(100%)', opacity: 0 }),
    animate('500ms ease-in', style({ transform: 'translateY(0)', opacity: 1 }))
  ]),
  transition(':leave', [
    style({ transform: 'translateY(-100%)', opacity: 1 }),
    animate('500ms ease-in', style({ transform: 'translateY(50%)', opacity: 1 }))
  ]),
  transition('small <=> large', animate('300ms ease-in', keyframes([
    style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
    style({opacity: 1, transform: 'translateY(35px)',  offset: 0.5}),
    style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
  ]))),
])