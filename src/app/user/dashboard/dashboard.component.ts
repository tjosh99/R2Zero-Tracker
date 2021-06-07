import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../../service/data.service';
import { multi } from '../../model/data'
import { barangay } from '../../Model/data-schema';
// import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import AOS from 'aos';
import Chart from 'chart.js'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;
  mapid: L.Map;
  propertyList: any;

  barangay = new barangay();

  city: Object;
  count: Object;
  counts: Object;
  count1: Object;
  brgy: Object;
  chart = [];
  chart1 = [];
  // canvas: any;
  ctx: any;
  confirmed 

  positive: number;
  recover: number;
  death: number

  city1: Object;
  brgyvalue=[];
  gencovidpercent=[];

  currentdate_confirmed: Object;
  currentdate_recovered: Object;
  currentdate_death: Object;
  currentdate_all: Object;

  // city1: Object;

  multi: any[];
  currentDate:any;
  city2 =[];
  brgypercent = [];
  malepercent=[];
  femalepercent=[];
  agepercent=[];
  agepercentdata=[];

  view: any[] = [700, 600];
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  maintainAspectRatio: boolean = false; 

  colorScheme = {
    domain: ["#6a040f", "#9d0208","#d00000",'#dc2f02','#e85d04',
            '#f48c06','#faa307','#ffba08','#8f3613','#a03c15',
            '#b24317','#c3491a','#d5501c','#e25822',
            '#e46533','#e77245','#e97f56','#eb8c67']
  };
  constructor(private ds: DataService, private router: Router) { 
    setInterval(() => {         
    
      this.currentDate = new Date();
      
     }, 1000);
    
    if (innerWidth > 992) {
      this.view = [innerWidth - 400, 300];
    } else {
      this.view = [innerWidth, 300];
    }
    if (innerWidth > 992) {
      this.view2 = [innerWidth - 300, 200];
    } else {
      this.view2 = [innerWidth, 200];
    }
  }

  showXAxis = true;
  showYAxis = false;
  gradient2 = false;
  showLegend2 = false;
  showXAxisLabel = true;
  view2: any[] = [500, 300];
  // xAxisLabel = 'Cases by Age';
 

  colorScheme2 = {
    domain: ['#62BEB6']
  };
  
  ngOnInit(): void {
    AOS.init();
    this.city_cases();
    this.count_recoveredcases();
    this.count_deathcases();
    this.count_totalcases()
    this.barangayrisk();
    //this.count_total_cases()

    this.city_cases1();
    this.getbrgy_tbl();
    // this.olongapocaseschart();
    // this.gendercovidpercentage();
    this.leafletMap1();
    this.notif_currentdate_confirmed();
    this.notif_currentdate_recovered();
    this.notif_currentdate_death();

    this.brgystatus()
    this.femalecovidpercentage();
    this.malecovidpercentage();
    this.agecovidpercentage();
  }

  city_cases2(){
    this.ds.getdata('city_cases').subscribe((data: any)=> {
      this.city2 = data.payload
      
      console.log(this.city);

    });
  }

  brgystatus(){
    this.ds.getdata('brgy_pchart').subscribe((data: any)=> {
      this.brgypercent = data.payload
      
      console.log(this.brgypercent)

    });
  }
  
  femalecovidpercentage(){
    this.ds.getdata('female_percent').subscribe((data: any)=> {
      this.femalepercent = data.payload
      // console.log(this.femalepercent)

    });
  }

  malecovidpercentage(){
    this.ds.getdata('male_percent').subscribe((data: any)=> {
      this.malepercent = data.payload
      // console.log(this.malepercent)

    });
  }
  agecovidpercentage(){
    this.ds.getdata('age_percent').subscribe((data: any)=> {
      this.agepercentdata = data.payload
      this.agepercent =  [
        {
          "name": "0-9",
          "value": this.agepercentdata[0].p_age
        },
        {
          "name": "10-19",
          "value": this.agepercentdata[1].p_age
        },
        {
          "name": "20-29",
          "value": this.agepercentdata[2].p_age
        }
        ,
        {
          "name": "30-39",
          "value": this.agepercentdata[3].p_age
        },
        {
          "name": "40-49",
          "value": this.agepercentdata[4].p_age
        },
        {
          "name": "50-59",
          "value": this.agepercentdata[5].p_age
        }
        ,
        {
          "name": "60-69",
          "value": this.agepercentdata[6].p_age
        }
        ,
        {
          "name": "70-79",
          "value": this.agepercentdata[7].p_age
        }
        ,
        {
          "name": "80+",
          "value": this.agepercentdata[8].p_age
        }
        
        
      ];
      console.log(this.agepercent);
    });
  }

  getbrgy_tbl(){
    this.ds.push_data("brgy_tbl", this.barangay).subscribe((data: any) => {
      this.brgy = data.payload;
      // console.log(this.brgy);
    });
  }

  private city_cases1(){
    this.ds.push_data("city_cases", null).subscribe((data: any) => {
      this.city = data.payload;
      // console.log(this.city)
    });
  }

  count_total_cases(){
    this.ds.push_data("counttotalcase", this.count).subscribe((data: any) => {
      this.count = data.payload;
      // console.log(this.count);
    })
  }

  private city_cases(){
    this.ds.push_data("city_cases", this.city).subscribe((data: any) => {
      this.city = data.payload;
      // console.log(this.city)
    });
  }

  private count_totalcases(){
    this.ds.push_data("count_totalcases", this.count1).subscribe((data: any) => {
      this.count1 = data.payload;
      // console.log(this.count1)
    });
  }

  private count_recoveredcases(){
    this.ds.push_data("count_recoveredcases", this.count).subscribe((data: any) => {
      this.count = data.payload;
      // console.log(this.count)
    });
  }

  private count_deathcases(){
    this.ds.push_data("count_deathcases", this.counts).subscribe((data: any) => {
      this.counts = data.payload;
      // console.log(this.counts)
    });
  }

  private notif_currentdate_confirmed(){
    this.ds.getdata("notif_currentdate_confirmed").subscribe((data: any) => {
      this.currentdate_confirmed = data.payload;
      console.log(this.currentdate_confirmed);
    });
  }

  private notif_currentdate_recovered(){
    this.ds.getdata("notif_currentdate_recovered").subscribe((data: any) => {
      this.currentdate_recovered = data.payload;
      console.log(this.currentdate_recovered);
    });
  }

  private notif_currentdate_death(){
    this.ds.getdata("notif_currentdate_death").subscribe((data: any) => {
      this.currentdate_death = data.payload;
      console.log(this.currentdate_death);
    });
  }

  // notification(){
  //   this.notif_currentdate_confirmed();
  //   this.notif_currentdate_recovered();
  //   this.notif_currentdate_death();
  // }

  leafletMap1() {
    this.mapid = new L.Map('mapid').setView([14.8386,120.2842],13);
    // https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
      }).addTo(this.mapid)

      

      fetch('https://r2zero.000webhostapp.com/brgycovidtracker_api/brgy').then(res => res.json())
      // fetch('http://localhost/brgycovidtracker_api/brgy').then(res => res.json())
      .then(json => {
        this.propertyList = json;
        // console.log(this.propertyList);
        this.leafletMap();
      });
      
    }

    leafletMap() {
      for(const property of this.propertyList.payload) {
        // console.log(property.brgy_totalcases);
        
        L.circle([property.brgy_lat, property.brgy_lng], {color: 'red',filColor: '#f03',fillOpacity: 0.2,weight: 3,opacity: 0.5,radius: property.brgy_totalcases*15/4}).addTo(this.mapid)
        .bindPopup("Barangay name: " +property.brgy_name  +  
          "<br>Total Cases: " + property.brgy_totalcases +
          "<br>Recovered Cases: " + property.brgy_recoveredcases +
          "<br>Death Cases: " + property.brgy_deathcases +
          "<br>Active Cases: " + property.brgy_activecases)
      }
    }

  ionViewWillLeave() {
    this.mapid.remove();
  }

  barangayrisk(){
    this.ds.push_data("brgy_cases1", null).subscribe((data: any) => {
      // console.log(data)
      let easttapinac = data.payload[0].brgy_name;
      let eastbajac = data.payload[1].brgy_name;
      let santarita = data.payload[2].brgy_name;
      let kalalake = data.payload[3].brgy_name;
      let kababae = data.payload[4].brgy_name;
      let kalaklan = data.payload[5].brgy_name;
      let asinan = data.payload[6].brgy_name;
      let banicain = data.payload[7].brgy_name;
      let barretto = data.payload[8].brgy_name;
      let gh = data.payload[9].brgy_name;
      let mabayuan = data.payload[10].brgy_name;
      let newcab = data.payload[11].brgy_name;
      let newila = data.payload[12].brgy_name;
      let oldcab = data.payload[13].brgy_name;
      let pagasa = data.payload[14].brgy_name;
      let westbajac = data.payload[15].brgy_name;
      let westtap = data.payload[16].brgy_name;

      let easttapinaccase = data.payload[0].brgy_totalcases;
      let eastbajaccase = data.payload[1].brgy_totalcases;
      let santaritacase = data.payload[2].brgy_totalcases;
      let kalalakecase = data.payload[3].brgy_totalcases;
      let kababaecase = data.payload[4].brgy_totalcases;
      let kalaklancase = data.payload[5].brgy_totalcases;
      let asinancase = data.payload[6].brgy_totalcases;
      let banicaincase = data.payload[7].brgy_totalcases;
      let barrettocase = data.payload[8].brgy_totalcases;
      let ghcase = data.payload[9].brgy_totalcases;
      let mabayuancase = data.payload[10].brgy_totalcases;
      let newcabcase = data.payload[11].brgy_totalcases;
      let newilacase = data.payload[12].brgy_totalcases;
      let oldcabcase = data.payload[13].brgy_totalcases;
      let pagasacase = data.payload[14].brgy_totalcases;
      let westbajaccase = data.payload[15].brgy_totalcases;
      let westtapcase = data.payload[16].brgy_totalcases;

      // console.log(westtapcase);

      // this.canvas = document.getElementById('canvas');
      // this.ctx = this.canvas.getContext('2d');
      // var ctx = document.getElementById("myChart").getContext('2d');
      this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
        type: 'bar',
        data: {
          labels: [easttapinac, eastbajac, santarita, kalalake, kababae, kalaklan, asinan, banicain, barretto, gh, mabayuan, newcab, newila, oldcab, pagasa, westbajac, westtap],
          datasets: [{
            // label: 'My First Dataset',
            data: [easttapinaccase, eastbajaccase, santaritacase, kalalakecase, kababaecase, kalaklancase, asinancase,
                    banicaincase, barrettocase, ghcase, mabayuancase, newcabcase, newilacase, oldcabcase, pagasacase, westbajaccase, westtapcase],
            backgroundColor: [
              '#62BEB6',
              '#62BEB6',
              '#62BEB6',
              '#62BEB6',
              '#62BEB6',
              '#62BEB6',
              '#62BEB6',
              '#62BEB6',
              '#62BEB6',
              '#62BEB6',
              '#62BEB6',
              '#62BEB6',
              '#62BEB6',
              '#62BEB6',
              '#62BEB6',
              '#62BEB6',
              '#62BEB6'
            ],
            // borderColor: [
            //   'rgb(255, 99, 132)',
            //   'rgb(255, 159, 64)',
            //   'rgb(255, 205, 86)',
            //   'rgb(75, 192, 192)',
            //   'rgb(54, 162, 235)',
            //   'rgb(153, 102, 255)',
            //   'rgb(201, 203, 207)',
            //   'rgb(255,101,80)',
            //   'rgb(211,189,175)',
            //   'rgb(246,203,159)',
            //   'RGB(166,233,183)',
            //   'RGB(68,132,195)',
            //   'RGB(183,75,90)',
            //   'RGB(52,37,102)',
            //   'RGB(19,255,170)',
            //   'RGB(14,103,31)',
            //   'RGB(56,174,137)'
            // ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          // maintainAspectRatio: false,
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                // drawBorder: false,
                // display: false,
              },
              // ticks: {
              //     display: false
              // },
              display: true
            }],
            yAxes: [{
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                // drawBorder: false,
                // display: false,
              },
              // ticks: {
              //   display: false
              // },
              display : true
            }]
          }
        }
      })
    })
  }

}
