import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PublicationService} from '../../service/Forum/publication/publication.service';
import {CommentService} from '../../service/Forum/publication/comment.service';

@Component({
  selector: 'app-remove-comment',
  templateUrl: './remove-comment.component.html',
  styleUrls: ['./remove-comment.component.css']
})
export class RemoveCommentComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<RemoveCommentComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, private commentService: CommentService) { }

  ngOnInit() {
  }
  remove() {
    this.commentService.remove(this.data.id).subscribe(res => {
      this.ngOnInit();
      this.dialogRef.close();
    });
  }
  close() {
    this.dialogRef.close();
  }

}
