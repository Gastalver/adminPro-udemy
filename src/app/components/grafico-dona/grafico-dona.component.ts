import {Component, Input, OnInit} from '@angular/core';
import {Label, MultiDataSet} from 'ng2-charts';
import {ChartType} from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {
  @Input() public doughnutChartLabels: Label[] = [];
  @Input() public doughnutChartData: MultiDataSet = [[]];
  @Input() public doughnutChartType: ChartType = 'doughnut';
  @Input() public leyenda: string;

  constructor() { }

  ngOnInit() {
    console.log('Leyenda: ' + this.leyenda);
    console.log('doughnutChartLabels: ' + JSON.stringify(this.doughnutChartLabels));
    console.log('doughnutChartData: ' + JSON.stringify(this.doughnutChartData));
    console.log('doughnutChartType: ' + JSON.stringify(this.doughnutChartType));
  }

}
