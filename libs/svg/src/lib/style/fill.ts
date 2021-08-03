import { Observable, of } from 'rxjs';

export interface Fill {
  rendered: Observable<string>
}

export class ConstantFill implements Fill{
  rendered: Observable<string>

  constructor(value: string) {
    this.rendered = of(value)
  }
}
