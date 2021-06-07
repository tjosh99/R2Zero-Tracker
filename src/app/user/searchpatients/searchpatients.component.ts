import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { patient } from '../../Model/data-schema';
import { barangay } from '../../Model/data-schema';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-searchpatients',
  templateUrl: './searchpatients.component.html',
  styleUrls: ['./searchpatients.component.scss']
})
export class SearchpatientsComponent implements OnInit {
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

  subscript: Subscription;
  patient = new patient();

  term: any;

  pat: Object;
  @Output() newPost: EventEmitter<patient> = new EventEmitter();

  isSave: boolean = false;
  Error: boolean = false;
  constructor(private ds: DataService, private http: HttpClient) {
    this.patients = new Array<any>();
  }

  ngOnInit(): void {
    this.getpatient();
  }

  getpatient() {
    this.subscript = this.ds.push_data('showpatient', this.patient).subscribe((data: any) => {
      this.pat = data.payload;
    });
  }

}
