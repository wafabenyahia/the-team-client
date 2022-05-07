import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Publicity} from '../model/forum/publicity/publicity';
import {DataSource} from '@angular/cdk/collections';
import {UserService} from '../service/user/user.service';
import {PublicityService} from '../service/Forum/publicity/publicity.service';
import {FileService} from '../service/Forum/publication/file.service';
import {DomSanitizer} from '@angular/platform-browser';
import {User} from '../model/user+role/user';
import {Domain} from '../model/forum/publicity/domain';
import {ChartData, ChartOptions} from 'chart.js';
import {RemovePublicityComponent} from './remove-publicity/remove-publicity.component';
import {MatDialog} from '@angular/material/dialog';
import {UpdatePublicityComponent} from './update-publicity/update-publicity.component';
import {AddPublicityComponent} from './add-publicity/add-publicity.component';



export interface Publicitylist {
  id: number;
  name?: string;
  user: User;
  src: any ;
  dateStart: any ;
  dateEnd: any ;
  cost: any;
  ageStart: any ;
  ageEnd: any ;
  domain: Domain;

}
@Component({
  selector: 'app-publicity',
  templateUrl: './publicity.component.html',
  styleUrls: ['./publicity.component.css'],
})

export class PublicityComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  constructor(private userService: UserService , private dialog: MatDialog , private publicityService: PublicityService, private fileService: FileService, private sanitizer: DomSanitizer) { }
  publicities: Publicity[] = [];
  publicities1: Publicitylist[] = [];
  feeds: Publicity[] = [];
  feedsPhoto: any[] = [];
  verifPhoto: any[] = [];
  domaincount: number[] = [];
  // @ViewChild('myCanvas')
  // myCanvas: ElementRef<HTMLCanvasElement>;
  public myArray = Object.values(Domain).map(item => String(item));
  focus: any;
  focus1: any;
  // doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  // doughnutChartData: MultiDataSet = [
  //   [55, 25, 20]
  // ];

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Nombre publicity for domain ',
      },
    },
  };
  salesData: ChartData<'doughnut'>;
    ngOnInit(): void {
      this.domaincount = [];
    this.publicities = new Array();
    this.publicities1 = [];
    this.feeds = [];
    this.verifPhoto = [];
    this.feedsPhoto = [];
    this.userService.findUserWithToken().subscribe(value2 => {
      // @ts-ignore
      const id = value2.id;
      this.publicityService.manger(id).subscribe((value: Publicity[]) => {
        this.feeds = value;
      });
    });
    this.salesData = null ;
    // console.log(this.setting.snippet
    this.publicityService.list().subscribe((res: Publicity[]) => {
      this.publicities = res ;
      this.feeds = res;
      console.log(res);
      this.publicities =  this.publicities.reverse() ;
      this.myArray.forEach(value1 => {
        this.domaincount.push(this.publicities.filter(value => value.domain === value1).length);
      });
      this.publicities.forEach(value => {
        // console.log(this.publicities1);
        if (value.nameFile == null) {
          // @ts-ignore
          this.publicities1.push({
            name: value.name,
            user: value.user ,
            src: './assets/img/brand/Fichier 2.png',
            id: value.id,
            dateStart: value.dateStart,
            dateEnd: value.dateEnd,
            cost: value.cost,
            ageStart: value.ageDebut,
            ageEnd : value.ageFin,
            domain: value.domain
          });

        } else {
          this.fileService.downloadFile(value.nameFile)
              .subscribe((baseImage: any) => {
                // alert(JSON.stringify(data.image));
                const objectURL = URL.createObjectURL(baseImage);

                if (  this.verifPhoto.indexOf(value.nameFile) === -1) {
                  this.verifPhoto.push(value.nameFile);
                  this.feedsPhoto.push(this.sanitizer.bypassSecurityTrustUrl(objectURL));
                }

                // console.log(value.nameFile);
                // @ts-ignore
                this.publicities1.push({
                  name: value.name,
                  user: value.user ,
                  src: this.sanitizer.bypassSecurityTrustUrl(objectURL),
                  id: value.id,
                  dateStart: value.dateStart,
                  dateEnd: value.dateEnd,
                  cost: value.cost,
                  ageStart: value.ageDebut,
                  ageEnd : value.ageFin,
                  domain: value.domain
                });
              });
        }
      });
      this.chart() ;
    });
  }
  openDialogAdd(): void {
    const dialogRef = this.dialog.open(AddPublicityComponent, {
      width: '800px',
      position: {
        top: '10px'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  openDialogModify(id: number): void {
    const dialogRef = this.dialog.open(UpdatePublicityComponent, {
      width: '800px',
      position: {
        top: '10px'
      },
      data: {
        id: id,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  openDialogDelete(id: number): void {
    const dialogRef = this.dialog.open(RemovePublicityComponent, {
      width: '400px',
      data: {
        id: id,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
   }

    chart(): void {
       this.salesData = {labels: this.myArray,
       datasets: [{
         label: 'nb domaine for ' + this.publicities.length + '%',
         data: this.domaincount,
         backgroundColor: [
           '#ffcfd2',
           '#fde4cf',
           '#fbf8cc',
           '#f1c0e8',
           '#cfbaf0',
           '#a3c4f3',
           '#b9fbc0'

         ],
         hoverOffset: 4
       }
       ],
     };
    }
}
