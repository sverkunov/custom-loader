import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  chartColor = '#008f68';

  @ViewChild('chartWrapper', {static: false}) chartWrapper: ElementRef;

  ngAfterViewInit(): void {
    this.chartWrapper.nativeElement.setAttribute('style', `border-color: ${this.chartColor}`);
  }

}
