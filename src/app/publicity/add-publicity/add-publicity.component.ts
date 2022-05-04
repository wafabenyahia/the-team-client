import {Component, Inject, OnInit} from '@angular/core';
import {PublicityService} from '../../service/Forum/publicity/publicity.service';
import {NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {Publicity} from '../../model/forum/publicity/publicity';
import {Domain} from '../../model/forum/publicity/domain';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-publicity',
  templateUrl: './add-publicity.component.html',
  styleUrls: ['./add-publicity.component.css']
})
export class AddPublicityComponent implements OnInit {

// tslint:disable-next-line:max-line-length
  constructor(private publicityService: PublicityService, calendar: NgbCalendar, private dialogRef: MatDialogRef<AddPublicityComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }
  focus: any;
  focus1: any;
  publicity: Publicity = new Publicity();

  public myArray = Object.values(Domain).map(item => String(item));
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  model1: NgbDate;
  model2: NgbDate;
  fileU: File;


  add() {
    console.log(this.fileU.name);
    if (this.model2 != null) {
      this.publicity.dateEnd = new  Date(this.model2.year, this.model2.month -  1, this.model2.day); }
    if (this.model1 != null) {
      this.publicity.dateStart = new  Date(this.model1.year, this.model1.month - 1, this.model1.day); }

    console.log(this.publicity);
    this.publicityService.add(this.publicity, this.fileU).subscribe(res => {
      console.log(res);
      this.dialogRef.close();
    });
    }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.publicity = new Publicity();
  }
  isRangeStart(date: NgbDate) {
    return this.model1 && this.model2 && date.equals(this.model1);
  }
  isRangeEnd(date: NgbDate) {
    return this.model1 && this.model2 && date.equals(this.model2);
  }
  isInRange(date: NgbDate) {
    return date.after(this.model1) && date.before(this.model2);
  }
  isActive(date: NgbDate) {
    return date.equals(this.model1) || date.equals(this.model2);
  }
  endDateChanged(date) {
    // tslint:disable-next-line:max-line-length
    if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day )) {
      this.model1 = this.model2;
    }
  }
  startDateChanged(date) {
    // tslint:disable-next-line:max-line-length
    if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day)) {
      this.model2 = this.model1;
    }

  }

  mama($event: Event) {
  }

  onFileChange(files: FileList) {
      this.fileU = files.item(0);
  }
}
