import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { contact } from '../../Model/data-schema';
import { DataService } from '../../service/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-barangaycontact',
  templateUrl: './barangaycontact.component.html',
  styleUrls: ['./barangaycontact.component.scss']
})
export class BarangaycontactComponent implements OnInit {
  title = 'app';
  contacts: Array<any>;
  totalRec : number;
  pages: number = 1;

  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
      previousLabel: '<--',
      nextLabel: '-->',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };
  @Output()onClose = new EventEmitter();

  contactID = [];
  GCID = '0000';

  subscript: Subscription;
  contact = new contact();
  cont: Object;

  term: any;

  cont_id: any;
  barangay: any;
  brgy_capt: any;
  tel_no: any;
  cont_no: any;

  @Output() newPost: EventEmitter<contact> = new EventEmitter();

  isSave :boolean = false;
  Error: boolean = false;
  constructor(private ds: DataService) {
    this.contacts = new Array<any>();
  }
  dates: Date;
  ngOnInit(): void {
    this.dates = new Date();
    this.getcontact();
    this.generateid();
  }

  generateid(){
    this.ds.generatePID('generateCID').subscribe((data: any)=>{
      this.contactID = data.payload[0].generatedID;
      console.log(this.contactID);
    })
  }

  getcontact(){
    this.subscript = this.ds.push_data('showcontact', this.contact).subscribe((data: any)=>{
      this.cont = data.payload;
      console.log(this.cont);
    });
  }

  updatecontact(){
    this.contact.cont_id = this.cont_id;
    this.contact.brgy_capt = this.brgy_capt;
    this.contact.tel_no = this.tel_no;
    this.contact.cont_no = this.cont_no;
    this.ds.push_data("updatecontact", this.contact).subscribe((data: any) => {
      this.cont = data.payload;
      console.log(this.cont);
      this.brgy_capt = '';
      this.tel_no = '';
      this.cont_no = '';
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Contact has been Update!',
        showConfirmButton: false,
        timer: 1000
      });
      this.getcontact();
      },(err:any)=>{
        this.isSave = false;
        this.Error = true;
    });
  }

  public showedit(i){
    this.cont_id = this.cont[i].cont_id;
    this.barangay = this.cont[i].barangay;
    this.brgy_capt = this.cont[i].brgy_capt;
    this.tel_no = this.cont[i].tel_no;
    this.cont_no = this.cont[i].cont_no;
    console.log(this.cont[i]);
  }

}
