import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  get searchText() {
    return this.searchForm.controls.searchText;
  }

  searchForm = new FormGroup({
    searchText: new FormControl('', Validators.required)
  });

  search() {
    if(this.searchForm.valid) {
    console.log('You searched for: ' + this.searchText.value)
    }
  }

}
