import { Component, ContentChild, AfterContentInit, OnInit, ElementRef, Input } from '@angular/core';
import { of } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { Chart } from 'angular-highcharts';
import { SeriesLineOptions } from 'highcharts';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterContentInit {
  @Input() chartColor: string;
  chart: Chart;
  chartName = 'alligator 🐸';

  @ContentChild(LoaderComponent, {static: true}) loader: LoaderComponent;
  @ContentChild(LoaderComponent, {static: true, read: ElementRef}) loaderRef: ElementRef;

  ngOnInit() {
    this.chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Alligator Chart',
        style: {
          color: this.chartColor
        }
      },
      credits: {
        enabled: false
      },
      series: [],
      colors: [this.chartColor]
    });

    this.initChartData();
  }

  private initChartData() {
    of<SeriesLineOptions>({name: this.chartName, data: [2.5, 2, 3, 2, 3, 2, 2], type: 'line'})
      .pipe(delay(1000), take(1))
      .subscribe((chartValue: SeriesLineOptions) => {
        this.chart.addSeries(chartValue, true, true);
        this.loaderRef.nativeElement.setAttribute('class', 'loaded');
      });
  }

  ngAfterContentInit() {
    if (this.loader) {
      this.loader.loadingMessage = `Please wait for ${this.chartName} will be loaded`;
      this.loaderRef.nativeElement.setAttribute('style', `background-color: ${this.chartColor}77; color: ${this.chartColor}`);
    }
  }

}
