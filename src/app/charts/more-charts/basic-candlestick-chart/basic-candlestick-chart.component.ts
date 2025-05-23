import { Component } from '@angular/core';
import { BasicCandlestickChartService } from './basic-candlestick-chart.service';

@Component({
    selector: 'app-basic-candlestick-chart',
    standalone: true,
    imports: [],
    templateUrl: './basic-candlestick-chart.component.html',
    styleUrl: './basic-candlestick-chart.component.scss'
})
export class BasicCandlestickChartComponent {

    constructor(
        private basicCandlestickChartService: BasicCandlestickChartService
    ) {}

    ngOnInit(): void {
        this.basicCandlestickChartService.loadChart();
    }

}