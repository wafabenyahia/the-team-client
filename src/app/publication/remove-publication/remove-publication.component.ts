import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PublicationService} from '../../service/Forum/publication/publication.service';

@Component({
  selector: 'app-remove-publication',
  templateUrl: './remove-publication.component.html',
  styleUrls: ['./remove-publication.component.css']
})
export class RemovePublicationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RemovePublicationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private publicationService: PublicationService) { }

  ngOnInit() {
  }
  remove() {
    this.publicationService.remove(this.data.id).subscribe(res => {
      this.ngOnInit();
      this.dialogRef.close();
    });
  }
  close() {
    this.dialogRef.close();
  }

}
