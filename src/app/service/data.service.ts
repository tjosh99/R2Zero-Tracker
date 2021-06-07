import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 private var_url: string = 'https://r2zero.000webhostapp.com/brgycovidtracker_api/';
  //  private var_url: string = 'http://localhost/brgycovidtracker_api/'; 
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private user: UserService) { }

  pull_data(api, data) {
    this.headers = new HttpHeaders({
      'Authorization': this.user.getToken(),
      'X-Auth-User': this.user.getID()
    });
    let options = { headers: this.headers };
    return this.http.post(this.var_url + api, JSON.stringify(data), options);
  }

  //--------------------M---------------------//

  generatePID(api: any) {
    return this.http.get(this.var_url + api);
  }

  //--------------------M---------------------//

  push_data(api: string, data: any) {
    return this.http.post(this.var_url + api, JSON.stringify(data));
  }

  pull_data_notoken(api, data) {
    return this.http.post(this.var_url + api, JSON.stringify(data));
  }

  sendApiRequest(method, data) {
    return <any>(
      this.http.post(this.var_url + method, btoa(JSON.stringify(data)))
    );
  }

  public getdata(api: any) {
    return this.http.get(this.var_url + api);
  }
}
