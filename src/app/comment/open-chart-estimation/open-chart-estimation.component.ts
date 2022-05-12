import {Component, Inject, OnInit} from '@angular/core';
import {ChartData, ChartOptions} from 'chart.js';
import {CommentService} from '../../service/Forum/publication/comment.service';
import {EstimationService} from '../../service/Forum/publication/estimation.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Domain} from '../../model/forum/publicity/domain';
import {Emoji} from '../../model/forum/publication/emoji';
import {Estimation} from '../../model/forum/publication/estimation';

@Component({
  selector: 'app-open-chart-estimation',
  templateUrl: './open-chart-estimation.component.html',
  styleUrls: ['./open-chart-estimation.component.css']
})
export class OpenChartEstimationComponent implements OnInit {
  private Emojicount: number[] = [];
  // tslint:disable-next-line:max-line-length
   constructor( private estimationService: EstimationService, private dialogRef: MatDialogRef<OpenChartEstimationComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {}
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Nombre publicity for domain ',
      },
    },
  };
  salesData: ChartData<'pie'>;
  public myArray = Object.values(Emoji).map(item => String(item));
  estimsations: Estimation[] = [];
  ngOnInit(): void {
    this.estimationService.findAllByCommentId(this.data.id).subscribe(value => {
      // @ts-ignore
      this.estimsations = value ;
      this.myArray.forEach(value1 => {
        this.Emojicount.push(this.estimsations.filter(value2 => value2.emoji === value1).length);
        this.chart();
      });
    });
  }

      chart(): void {
    this.salesData = {labels: this.myArray,
      datasets: [{
        label: 'nb domaine %',
        data: this.Emojicount,
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
