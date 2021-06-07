import { Component, OnInit } from '@angular/core';
import { LoginData } from '../Model/data-schema';
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials = new LoginData();

  username: string;
  password: string;

  constructor(private ds: DataService, private user: UserService, private router: Router) { }

  ngOnInit() {
    if (this.user.getUserLoggedIn()) {
      this.router.navigate(['admin/admindashboard']);
    }
  }

  checkCredentials(e) {
    e.preventDefault();
    this.credentials.username = e.target.elements.username.value;
    this.credentials.password = e.target.elements.password.value;

    this.ds.pull_data_notoken('login', this.credentials).subscribe((data: any) => {
      console.log(data);
      let a = data.payload;
      let fname = data.payload.afname;
      let lname = data.payload.alname;
      this.user.setUserLoggedIn(a.token, a.empno, a.empname);
      localStorage.setItem('administrator', JSON.stringify(a));
      Swal.fire(
        'Login Success!',
        'Welcome Admin ' + fname + ' ' + lname,
        'success'
      )
      this.router.navigate(['admin/admindashboard']);
    }, er => {
      console.log(er.error.status.remarks, er.error.status.message);
      alert(er.error.status.message);
    });
  }

  // link(){
  //   this.router.navigate(['register']);
  // }

}
