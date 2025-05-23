import { Component } from '@angular/core';
import { SemiCircularGaugeRadialbarChartService } from './semi-circular-gauge-radialbar-chart.service';

@Component({
    selector: 'app-semi-circular-gauge-radialbar-chart',
    standalone: true,
    imports: [],
    templateUrl: './semi-circular-gauge-radialbar-chart.component.html',
    styleUrl: './semi-circular-gauge-radialbar-chart.component.scss'
})
export class SemiCircularGaugeRadialbarChartComponent {

    constructor(
        private semiCircularGaugeRadialbarChartService: SemiCircularGaugeRadialbarChartService
    ) {}

    ngOnInit(): void {
        this.semiCircularGaugeRadialbarChartService.loadChart();
    }

}