import {animate, keyframes, query, stagger, style, transition, trigger} from '@angular/animations';

export const animateListItems = trigger('listAnimation', [
  transition('* => *', [
    query(
      ':enter',
      style({
        opacity: 0,
      }),
      {optional: true},
    ),
    query(
      ':enter',
      stagger('300ms', [
        animate(
          '1.3s ease-in',
          keyframes([
            style({opacity: 0, transform: 'translateY(380px)', offset: 0}),
            style({opacity: 0.5, transform: 'translateY(-8px)', offset: 0.5}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1}),
          ]),
        ),
      ]),
      {optional: true},
    ),
  ]),
]);

export const animateConditional = trigger('inOutAnimation', [
  transition(':enter', [
    style({height: 0, opacity: 0}),
    animate('1s ease-out', style({height: 300, opacity: 1})),
  ]),
  transition(':leave', [
    style({height: 300, opacity: 1}),
    animate('1s ease-in', style({height: 0, opacity: 0})),
  ]),
]);
