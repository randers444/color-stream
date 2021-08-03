import { Observable, of } from 'rxjs';

export interface Stroke {
  rendered: Observable<string>
}

export class ConstantStroke implements Stroke{
  rendered: Observable<string>

  constructor(value: string) {
    this.rendered = of(value)
  }
}
