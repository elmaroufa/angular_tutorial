import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bindings',
  templateUrl: './bindings.component.html',
  styleUrl: './bindings.component.css'
})
export class BindingsComponent {

  @Input() title = '';
  @Output() liked  = new EventEmitter();

}
