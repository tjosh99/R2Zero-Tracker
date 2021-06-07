import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-barangay',
  templateUrl: './barangay.component.html',
  styleUrls: ['./barangay.component.scss']
})
export class BarangayComponent implements OnInit {

  constructor(private http: HttpClient, private ds: DataService) { }
  lines = []; //for headings
  linesR = []; // for rows
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
          // return this.http.post('http://localhost/brgycovidtracker_api/mypage.php/'
          //       , myFormData).subscribe((res: Response) => {
          //     console.log("User Registration has been done.");
                
                
                  
          //     });
              
          this.ds.push_data('addcsvdata', myFormData).subscribe((data: any) =>{
            console.log("User Registration has been done.");
          })
      }
    }
  }
  ngOnInit(): void {
  }

}
