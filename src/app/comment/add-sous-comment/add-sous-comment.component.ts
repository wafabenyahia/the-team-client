import {Component, Inject, OnInit} from '@angular/core';
import {CommentService} from '../../service/Forum/publication/comment.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Comment} from '../../model/forum/publication/comment';
import {EstimationService} from '../../service/Forum/publication/estimation.service';

@Component({
  selector: 'app-add-sous-comment',
  templateUrl: './add-sous-comment.component.html',
  styleUrls: ['./add-sous-comment.component.css']
})
export class AddSousCommentComponent implements OnInit {

// tslint:disable-next-line:max-line-length
  constructor(private commentService: CommentService, private estimationService: EstimationService, private dialogRef: MatDialogRef<AddSousCommentComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {

  }

  comment: Comment = new Comment();
  verif = false;
  msg: string = null;
  arrays: string[] = [];

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.comment = new Comment();
    this.commentService.findById(this.data.id).subscribe((res: Comment) => {
      this.comment = res;
      console.log(this.comment);
      this.arrays = this.comment.sous_comments;
    });
  }

  addsou() {
    this.commentService.addsouscomment(this.comment.id, this.msg).subscribe(val => {
      this.arrays.push(this.msg);
      this.msg = '';
    });
  }

}
