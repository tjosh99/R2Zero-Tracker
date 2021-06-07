import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { patient } from '../../../Model/data-schema';
import { barangay } from '../../../Model/data-schema';
import { DataService } from '../../../service/data.service';
import Swal from 'sweetalert2';
import { ThrowStmt } from '@angular/compiler';
declare var $: any;
// declare const modal1:any;

@Component({
  selector: 'app-viewpatient',
  templateUrl: './viewpatient.component.html',
  styleUrls: ['./viewpatient.component.scss']
})
export class ViewpatientComponent implements OnInit {
  // modal(){
  //   modal1();
  // }
  // @Input()selected1: string = '';
  title = 'app';
  patients: Array<any>;
  totalRec: number;
  pages: number = 1;

  public maxSize: number = 5;
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

  test = [];
  patientID: any = [];
  GPID: string = 'PHOC';

  @Output() onClose = new EventEmitter();

  subscript: Subscription;
  patient = new patient();
  getInfo: Object;
  obj_pat = new patient();
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
  cstatus: any;
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
  c_return_status: number;
  return_positive_date: string;


  @Output() newPost: EventEmitter<patient> = new EventEmitter();

  isSave: boolean = false;
  Error: boolean = false;
  constructor(private ds: DataService, private http: HttpClient) {
    this.patients = new Array<any>();
  }

  pat_id: number;

  //dtOptions: DataTables.Settings = {};
  lines = []; //for headings
  linesR = []; // for rows
  dates: Date;
  changeListener(files: FileList){
    console.log(files);
    if(files && files.length > 0) {
       let file : File = files.item(0); 
         console.log(file.name);
         console.log(file.size);
         console.log(file.type);
         let reader: FileReader = new FileReader();
         reader.readAsText(file);
         reader.onload = (e) => {
          let csv: any = reader.result;
          let allTextLines = [];
          allTextLines = csv.split(/\r|\n|\r/);
         // console.log(allTextLines);
         //Table Headings
          let headers = allTextLines[0].split(';');
          let data = headers;
          let tarr = [];
          for (let j = 0; j < headers.length; j++) {
            tarr.push(data[j]);
          }
          //Pusd headinf to array variable
          this.lines.push(tarr);
          
         
          // Table Rows
          let tarrR = [];
          //Create formdata object
          var myFormData = new FormData();
          let arrl = allTextLines.length;
          let rows = [];
          
          for(let i = 1; i < arrl; i++){
          rows.push(allTextLines[i].split(';'));
          if(allTextLines[i]!=""){
          // Save file data into formdata varibale  
          myFormData.append("data"+i, allTextLines[i]);
        }
          }
         
          for (let j = 0; j < arrl; j++) {
           
            
             
              tarrR.push(rows[j]);
              tarrR = tarrR.filter(function(i){ return i != ""; });
              
              
              // Begin assigning parameters
             
              
              
             
           
          }
         //Push rows to array variable
          this.linesR.push(tarrR);
          //Sending post request with data to php file
          return this.http.post('http://localhost/mypage.php/'
                , myFormData).subscribe((res: Response) => {
              console.log("User Registration has been done.");
                
                
                  
              });
          
      }
    }
  }
  ngOnInit() {
    this.dates = new Date();
    // $(document).ready(function() {
    //   var i = 1;
    //   $('#add').click(function(){
    //       i++;
    //       $('#dynamic_form').append(

    //         '<div class="col-lg-6" id="remove'+i+'">'+
    //             '<div class="form-group">'+
    //                 '<label for="pid">Patient ID: &nbsp;</label>'+                    
    //                 '<input  type="text" name="pid"  class = "form-control" value="'+this.GPID+'-'+this.patientID+'">'+
    //                 '<label for="page">Patient Age: &nbsp; </label>'+
    //                 '<input [(ngModel)]="page" type="text" id="page" name = "page" class = "form-control">'+
    //                 '<label for="pnationality">Patient Nationality: &nbsp; </label>'+
    //                 '<select [(ngModel)]="pnationality" type="text" id="pnationality" name = "pnationality" class = "form-control">'+
    //                     '<option disabled selected>Select Nationality</option>'+
    //                     '<option value="Filipino">Filipino</option>'+
    //                     '<option value="American">American</option>'+
    //                     '<option value="Canadian">Canadian</option>'+
    //                 '</select>'+
    //                 '<label for="pgender">Gender: &nbsp; </label>'+
    //                 '<select [(ngModel)]="pgender"  name="pgender" id="pgender" class="form-control">'+
    //                     '<option disabled selected>Select Gender</option>'+
    //                     '<option value="Male">Male</option>'+
    //                     '<option value="Female">Female</option>'+
    //                 '</select>'+
    //                 '<label for="pbarangay">Barangay: &nbsp; </label>'+
    //                 '<select [(ngModel)]="pbarangay" name="pbarangay" id="pbarangay" class="form-control">'+
    //                     '<option>Select Barangay</option>'+
    //                     '<option value="East Tapinac">East Tapinac</option>'+
    //                     '<option value="East Bajac-bajac">East Bajac-bajac</option>'+
    //                     '<option value="Sta Rita">Sta Rita</option>'+
    //                     '<option value="New Kalalake">New Kalalake</option>'+
    //                     '<option value="New Kababae">New Kababae</option>'+
    //                     '<option value="Kalaklan">Kalaklan</option>'+
    //                     '<option value="Asinan">Asinan</option>'+
    //                     '<option value="New Banicain">New Banicain</option>'+
    //                     '<option value="Barretto">Barretto</option>'+
    //                     '<option value="Gordon Heights">Gordon Heights</option>'+
    //                     '<option value="Mabayuan">Mabayuan</option>'+
    //                     '<option value="New Cabalan">New Cabalan</option>'+
    //                     '<option value="New Ilalim">New Ilalim</option>'+
    //                     '<option value="Old Cabalan">Old Cabalan</option>'+
    //                     '<option value="Pag-Asa">Pag-Asa</option>'+
    //                     '<option value="West Bajac-Bajac">West Bajac-Bajac</option>'+
    //                     '<option value="West Tapinac">West Tapinac</option>'+
    //                 '</select>'+
    //                 '<label for="pwork">Patient Work: &nbsp;</label>'+
    //                 '<input [(ngModel)]="pwork" type="text" id="pwork" name = "pwork" class = "form-control">'+

    //                 '<label for="prelation">Relation of Patients: &nbsp;</label>'+
    //                 '<input [(ngModel)]="prelation" type="text" id="prelation" name = "prelation" class = "form-control">'+
    //             '</div>'+
    //         '</div>'+
    //         '<div class="col-lg-6">'+
    //             '<div class="form-group">'+
    //                 '<label for="phistory">Travel History: &nbsp;</label>'+
    //                 '<input [(ngModel)]="phistory" type="text" id="phistory" name = "phistory" class = "form-control">'+
    //                 '<label for="psymptoms">Symptoms: &nbsp;</label>'+
    //                 '<input [(ngModel)]="psymptoms" type="text" id="psymptoms" name = "psymptoms" class = "form-control">'+
    //                 '<label for="pdiagnosed">Disease: &nbsp;</label>'+
    //                 '<input [(ngModel)]="pdiagnosed" type="text" id="pdiagnosed" name = "pdiagnosed" class = "form-control">'+
    //                 '<label for="ptestresult">RT-PCR: &nbsp;</label>'+
    //                 '<input [(ngModel)]="ptestresult" type="text" id="ptestresult" name = "ptestresult" class = "form-control">'+
    //                 '<label for="phospital">Admitted at: &nbsp;</label>'+
    //                 '<select [(ngModel)]="phospital" name="phospital" id="phospital" class="form-control">'+
    //                     '<option disabled selected>Select Status</option>'+
    //                     '<option value="isolation facility">Isolation Facility</option>'+
    //                     '<option value="quarantine facility">Quarantine Facility</option>'+
    //                     '<option value="home isolation">Home Isolation</option>'+
    //                     '<option value="hospital in the city">Hospital in the City</option>'+
    //                     '<option value="private hospital">Private Hospital</option>'+
    //                     '<option value="bataan hospital">Bataan Hospital</option>'+
    //                 '</select>'+
    //                 '<!-- <input [(ngModel)]="phospital" type="text" id="phospital" name = "phospital" class = "form-control"> -->'+
    //                 '<label for="pdate">Date Post: &nbsp;</label>'+
    //                 '<input [(ngModel)]="pdate" type="date" id="pdate" name = "pdate" class = "form-control">'+
    //                 '<label for="pstatus">Patient Status: &nbsp;</label>'+
    //                 '<select [(ngModel)]="pstatus" name="pstatus" id="pstatus" class="form-control">'+
    //                     '<option disabled selected>Select Status</option>'+
    //                     '<option value="1">Admitted</option>'+
    //                     '<option value="2">Not Admitted</option>'+
    //                 '</select>'+
    //                 '<br>'+
    //             '</div>'+
    //             '<button type="button" name="remove" id="'+i+'" class="btn btn-danger btn_remove">X</button>'+
    //         '</div>'
    //       );
    //   });
    // });
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
    // this.showeditt();
  }

  generateid() {
    this.ds.generatePID('generatePID').subscribe((data: any) => {
      this.patientID = data.payload[0].generatedID;
      console.log(this.patientID);
    })
  }

  getpatient() {
    this.subscript = this.ds.push_data('showpatient', this.patient).subscribe((data: any) => {
      this.pat = data.payload;
    });
  }

  getbarangay() {
    this.ds.push_data("barangayname", this.barangay).subscribe((data: any) => {
      this.brgy = data.payload;
      console.log(this.brgy);
    });
  }

  getbrgy_tbl() {
    this.ds.push_data("brgy_tbl", this.barangay).subscribe((data: any) => {
      this.brgy = data.payload;
      console.log(this.brgy);
    });
  }

  public search1() {
    this.getInfo = {
      "p_id": this.p_id
    };
    this.ds.push_data("searchpatient", this.getInfo).subscribe((data: any) => {
      this.pat = data.payload;
      console.log(data);
      this.pid = this.getInfo[0]['p_id'];
      this.page = this.getInfo[0]['p_age'];
      this.pgender = this.getInfo[0]['p_gender'];
      this.pbarangay = this.getInfo[0]['p_barangay'];
      this.pwork = this.getInfo[0]['pwork'];
      this.pdate = this.getInfo[0]['p_date'];
    }, (err: any) => {
      this.isSave = false;
      this.Error = true;
    });
  }

  addreturnbrgytotalcases() {
    this.barangay.brgy_name = this.pbarangay;
    console.log(this.barangay);
    this.ds.push_data("positivecases", this.barangay).subscribe((data: any) => {
      this.brgy = data.payload;
      console.log(this.brgy);
    });
  }

  addbrgyrecoveredcase() {
    this.barangay.brgy_name = this.pbarangay;
    console.log(this.barangay);
    this.ds.push_data("recoveredcases", this.barangay).subscribe((data: any) => {
      this.brgy = data.payload;
      console.log(this.brgy);
    })
  }

  addbrgydeathcase() {
    this.barangay.brgy_name = this.pbarangay;
    console.log(this.barangay);
    this.ds.push_data("deathcases", this.barangay).subscribe((data: any) => {
      this.brgy = data.payload;
      console.log(this.brgy);
    })
  }

  addbrgytotalcase() {
    this.barangay.brgy_name = this.pbarangay;
    console.log(this.barangay);
    this.ds.push_data("totalcases", this.barangay).subscribe((data: any) => {
      this.brgy = data.payload;
      console.log(this.brgy);
    })
  }

  addPatients() {
    if (this.page && this.pnationality && this.pgender && this.pbarangay && this.pdate) {
      this.addbrgytotalcase();
      this.obj_pat.p_id = this.GPID + "-" + this.patientID;
      this.obj_pat.p_age = this.page;
      this.obj_pat.p_nationality = this.pnationality;
      this.obj_pat.p_gender = this.pgender;
      this.obj_pat.p_barangay = this.pbarangay;
      // this.obj_pat.p_work = this.pwork;
      this.obj_pat.p_date = this.pdate;
      // this.obj_pat.p_status = this.pstatus;
      // this.obj_pat.p_test_result = this.ptestresult;
      // this.obj_pat.p_relation_of_patients = this.prelation;
      // this.obj_pat.p_travel_history = this.phistory;
      // this.obj_pat.p_hospital = this.phospital;
      // this.obj_pat.p_symptoms = this.psymptoms;
      // this.obj_pat.p_diagnosed = this.pdiagnosed;
      console.log(this.obj_pat);
      this.ds.push_data('addpatient', this.obj_pat).subscribe((data: any) => {
        this.pat = data.payload;
        this.pid = '';
        this.page = '';
        this.pnationality = '';
        this.pgender = '';
        this.pbarangay = '';
        // this.pwork = '';
        this.pdate = '';
        // this.pstatus = 0;
        // this.ptestresult = '';
        // this.prelation = '';
        // this.phistory = '';
        // this.phospital = '';
        // this.psymptoms = '';
        // this.pdiagnosed = '';
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Patient has been Added!',
          showConfirmButton: false,
          timer: 1000
        });
        this.generateid();
        this.getpatient();
      }, (err: any) => {
        this.isSave = false;
        this.Error = true;
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Fill up the required field please!',
        showConfirmButton: false,
        timer: 500
      });
    }
  }

  updatereturnpatient() {
    this.addreturnbrgytotalcases();
    this.patient.p_id = this.pid;
    this.patient.p_barangay = this.pbarangay;
    this.patient.return_positive_date = this.return_positive_date;
    this.patient.c_status = this.cstatus;
    // console.log(this.patient);
    this.ds.push_data('updatereturnpatients', this.patient).subscribe((data: any) => {
      this.pat = data.payload;
      this.return_positive_date = '';
      this.cstatus = '';
      this.getpatient();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Patient has been Updated!',
        showConfirmButton: false,
        timer: 1500
      });
    }, (err: any) => {
      this.isSave = false;
      this.Error = true;
    });
  }

  updatepatient1() {
    // this.addbrgyrecoveredcase();
    this.addbrgydeathcase();
    this.patient.p_id = this.pid;
    this.patient.p_age = this.page;
    this.patient.p_gender = this.pgender;
    this.patient.p_barangay = this.pbarangay;
    this.patient.p_work = this.pwork;
    this.patient.p_date_status = this.pdatestatus;
    this.patient.c_status = this.cstatus;
    console.log(this.patient);
    this.ds.push_data('updatepatient', this.patient).subscribe((data: any) => {
      this.pat = data.payload;
      this.pid = '';
      this.page = '';
      this.pgender = '';
      this.pbarangay = '';
      this.pwork = '';
      this.pdatestatus = '';
      this.getpatient();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Patient has been Updated!',
        showConfirmButton: false,
        timer: 1500
      });

    }, (err: any) => {
      this.isSave = false;
      this.Error = true;
    });
  }

  updatepatient() {
    if (this.cstatus && this.pdatestatus) {
      this.addbrgyrecoveredcase();
      this.patient.p_id = this.pid;
      this.patient.p_barangay = this.pbarangay;
      this.patient.p_date_status = this.pdatestatus;
      this.patient.c_status = this.cstatus;
      console.log(this.patient);
      this.ds.push_data('updatepatient', this.patient).subscribe((data: any) => {
        this.pat = data.payload;
        this.pid = '';
        this.pbarangay = '';
        this.pdatestatus = '';
        this.getpatient();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Patient has been Updated!',
          showConfirmButton: false,
          timer: 1000
        });
      }, (err: any) => {
        this.isSave = false;
        this.Error = true;
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'fill up the form first!',
        showConfirmButton: false,
        timer: 500
      });
    }
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

  public showedit(i) {
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
    this.pdatestatus = this.pat[i].p_date_status;
    console.log(this.pat[i]);
  }

  // showeditt(){
  //   for(let i=; i<100; i++){
  //     console.log(i);
  //     this.pat_id = i;
  //   }
  // }

  cancel() { this.onClose.emit(null); }
}
