import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { patient } from '../../Model/data-schema';
import { barangay } from '../../Model/data-schema';
import { DataService } from '../../service/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-managepatient',
  templateUrl: './managepatient.component.html',
  styleUrls: ['./managepatient.component.scss']
})
export class ManagepatientComponent implements OnInit {

  // modal(){
  //   modal1();
  // }
  // @Input()selected1: string = '';
  title = 'app';
  patients: Array<any>;
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

  patientID = [];
  GPID = 'PHOC'

  @Output()onClose = new EventEmitter();

  subscript: Subscription;
  patient = new patient();
  getInfo: Object;
  barangay = new barangay();
  pat: Object;
  brgy: Object;

  p_id: string;

  term: any;

  pid: string;
  page: string;
  pgender: string;
  pbarangay: string;
  pwork: string;
  pdate: string;
  pdatestatus: string;
  cstatus: number;
  pstatus: number;
  presult: number;
  prelation: string;
  phistory: string;
  phospital: string;
  psymptoms: string;
  pdiagnosed: string;
  ptestresult: string;
  modefedstring: number;
  pnationality: string;


  @Output() newPost: EventEmitter<patient> = new EventEmitter();

  isSave :boolean = false;
  Error: boolean = false;
  constructor(private ds: DataService) {
    this.patients = new Array<any>();
  }
  
  //dtOptions: DataTables.Settings = {};
  dates: Date;
  ngOnInit(){
    this.dates = new Date();
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 25,
    //   lengthMenu : [25, 100, 500],
    //   processing: true
    // };
    this.getpatient();
    //this.getbarangay()
    this.getbrgy_tbl();
    this.generateid();
  }

  generateid(){
    this.ds.generatePID('generatePID').subscribe((data: any)=>{
      this.patientID = data.payload[0].generatedID;
      console.log(this.patientID);
    })
  }

  getpatient(){
    this.subscript = this.ds.push_data('patientinfo', this.patient).subscribe((data: any)=>{
      this.pat = data.payload;
    });
  }

  getbarangay(){
    this.ds.push_data("barangayname", this.barangay).subscribe((data: any) => {
      this.brgy = data.payload;
      console.log(this.brgy);
    });
  }

  getbrgy_tbl(){
    this.ds.push_data("brgy_tbl", this.barangay).subscribe((data: any) => {
      this.brgy = data.payload;
      console.log(this.brgy);
    });
  }

  public search1(){
    this.getInfo = {
      "p_id": this.p_id
    };
    this.ds.push_data("searchpatient", this.getInfo).subscribe((data: any)=>{
    this.pat = data.payload;
    console.log(data);
      this.pid = this.getInfo[0]['p_id'];
      this.page = this.getInfo[0]['p_age'];
      this.pgender = this.getInfo[0]['p_gender'];
      this.pbarangay = this.getInfo[0]['p_barangay'];
      this.pwork = this.getInfo[0]['pwork'];
      this.pdate = this.getInfo[0]['p_date'];
    },(err:any)=>{
      this.isSave = false;
      this.Error = true;
    });
  }

  manageupdatepatient(){
    this.patient.p_id = this.pid;
    this.patient.p_age = this.page;
    this.patient.p_nationality = this.pnationality;
    this.patient.p_gender = this.pgender;
    this.patient.p_work = this.pwork;
    this.patient.p_date = this.pdate;
    this.patient.p_test_result = this.ptestresult;
    this.patient.p_relation_of_patients = this.prelation;
    this.patient.p_travel_history = this.phistory;
    this.patient.p_hospital = this.phospital;
    this.patient.p_symptoms = this.psymptoms;
    this.patient.p_diagnosed = this.pdiagnosed;
    this.ds.push_data("manageupdatepatients", this.patient).subscribe((data: any) => {
      this.pat = data.payload;
      this.pid;
      this.page;
      this.pnationality;
      this.pgender;
      this.pwork;
      this.pdate;
      this.ptestresult;
      this.prelation;
      this.phistory;
      this.phospital;
      this.psymptoms;
      this.pdiagnosed;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Patient hass been Update!',
        showConfirmButton: false,
        timer: 1500
      });
      this.getpatient()
    },(err:any)=>{
      this.isSave = false;
      this.Error = true;
    });
  }

  deletebrgytotalcases(){
    this.barangay.brgy_name = this.pbarangay;
    console.log(this.barangay);
    this.ds.push_data("deletebrgytotalcases", this.barangay).subscribe((data: any) => {
      this.brgy = data.payload;
      console.log(this.brgy);
    })
  }

  deletepatient(i){ 
    this.patient.p_id = this.pat[i].p_id;
    console.log(this.patient);
     Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to back this data!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.deletebrgytotalcases();
        this.ds.push_data('deletepatients', this.patient).subscribe((data: any)=>{
        this.pat = data.payload;
          this.getpatient();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Patient Has Been Deleted To Database!',
            showConfirmButton: false,
            timer: 1000
          });
    
        },(err:any)=>{
          this.isSave = false;
          this.Error = true;
        });
      }
    });
  }

  // recoveredidbrgy(){
  //   this.patient.p_id = this.p_id;
  //   this.patient.p_barangay = this.pbarangay;
  //   this.ds.push_data('recoveredidbrgy', this.patient).subscribe((data: any) => {
  //     this.pat = data.payload.p_id['PHOC-1056'];
  //     console.log(this.pat);
  //   });
  // }

  // updateform(){
  //   this.selectItem1();
  // }

  public showedit(i){
    this.pid = this.pat[i].p_id;
    this.page = this.pat[i].p_age;
    this.pwork = this.pat[i].p_work;
    this.pgender = this.pat[i].p_gender;
    this.pbarangay = this.pat[i].p_barangay;
    this.pnationality = this.pat[i].p_nationality;
    this.prelation = this.pat[i].p_relation_of_patients;
    this.phistory = this.pat[i].p_travel_history;
    this.psymptoms = this.pat[i].p_symptoms;
    this.pdiagnosed = this.pat[i].p_diagnosed;
    this.ptestresult = this.pat[i].p_test_result;
    this.cstatus = this.pat[i].c_status;
    this.pstatus = this.pat[i].p_status;
    this.phospital = this.pat[i].p_hospital;
    this.pdate = this.pat[i].p_date;
    // this.pdate = this.pat[i].p
    console.log(this.pat[i]);
  }

  cancel() { this.onClose.emit(null); }
}