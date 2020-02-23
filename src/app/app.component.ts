import {Component, InjectionToken, Inject} from '@angular/core';
//@ts-ignore
import { tokens } from './tokens'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public test: any;
  constructor(
    @Inject(tokens[0]) test
  ){
    this.test = test;
  }
  title = 'dynamicPlugin';
  testIteration = new Array(300);
}
