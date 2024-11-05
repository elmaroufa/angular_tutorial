import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  
  title = 'my-app-http';

  ngAfterViewInit(): void {
    this.title = 'Learning Angular';
  }
  
}
