import { Component } from '@angular/core';
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  spinnerStyle = Spinkit;
  
  title = 'Tracker';

  showModal: boolean = false;

  selected: string = '';

  selectItem() {
    this.showModal = true;
  }

  selectedItem(selected) {
    this.showModal = false; // hide modal
    if(selected) {
      this.selected = selected;
    }
  }
}
