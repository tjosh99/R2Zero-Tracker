import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import { contact } from '../../Model/data-schema';
@Component({
  selector: 'app-hotlines',
  templateUrl: './hotlines.component.html',
  styleUrls: ['./hotlines.component.scss']
})
export class HotlinesComponent implements OnInit {
  subscript: Subscription;
  contact = new contact();
  cont: Object;

  cont_id: any;
  barangay: any;
  brgy_capt: any;
  tel_no: any;
  cont_no: any;


  @Output() newPost: EventEmitter<contact> = new EventEmitter();

  isSave :boolean = false;
  Error: boolean = false;
  constructor(private ds: DataService) {}

  ngOnInit(): void {
    this.getcontact();
  }

  getcontact(){
    this.subscript = this.ds.push_data('showcontact', this.contact).subscribe((data: any)=>{
      this.cont = data.payload;
      console.log(this.cont);
    });
  }

}
