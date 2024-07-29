import { Component, OnInit } from '@angular/core';
import { AsyncService } from '../async.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrl: './async.component.css'
})
export class AsyncComponent implements OnInit {

  data$ : Observable<String[]> | undefined

  constructor(private asyncService : AsyncService){}

  ngOnInit(): void {
    this.data$ = this.asyncService.getData();
  }

}
