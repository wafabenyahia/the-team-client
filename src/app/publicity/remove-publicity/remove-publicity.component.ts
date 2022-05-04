import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {PublicityService} from '../../service/Forum/publicity/publicity.service';

@Component({
  selector: 'app-remove-publicity',
  templateUrl: './remove-publicity.component.html',
  styleUrls: ['./remove-publicity.component.css']
})
export class RemovePublicityComponent implements OnInit {
  constructor(
      public dialogRef: MatDialogRef<RemovePublicityComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, private publicityService: PublicityService) { }

  ngOnInit() {
  }
  remove() {
    this.publicityService.remove(this.data.id).subscribe(res => {
      this.ngOnInit();
      this.dialogRef.close();
    });
  }

  close() {
    this.dialogRef.close();
  }
}
