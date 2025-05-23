import { Component } from '@angular/core';
import { AnalyticsOverviewService } from './analytics-overview.service';

@Component({
    selector: 'app-analytics-overview',
    standalone: true,
    imports: [],
    templateUrl: './analytics-overview.component.html',
    styleUrl: './analytics-overview.component.scss'
})
export class AnalyticsOverviewComponent {

    constructor(
        private analyticsOverviewService: AnalyticsOverviewService
    ) {}

    ngOnInit(): void {
        this.analyticsOverviewService.loadChart();
    }

}