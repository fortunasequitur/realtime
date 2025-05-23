import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class SupportOverviewService {

    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    async loadChart(): Promise<void> {
        if (this.isBrowser) {
            try {
                // Dynamically import ApexCharts
                const ApexCharts = (await import('apexcharts')).default;

                // Define chart options
                const options = {
                    series: [
                        55, 44, 30, 12
                    ],
                    chart: {
                        height: 382,
                        type: "pie"
                    },
                    labels: [
                        "Solved", "In Progress", "Pending", "Unassigned"
                    ],
                    colors: [
                        "#37D80A", "#605DFF", "#AD63F6", "#FD5812"
                    ],
                    dataLabels: {
                        enabled: false
                    },
                    plotOptions: {
                        pie: {
                            expandOnClick: false
                        }
                    },
                    stroke: {
                        width: 1,
                        show: true,
                        colors: ["#ffffff"]
                    },
                    legend: {
                        show: true,
                        fontSize: '12px',
                        position: 'bottom',
                        horizontalAlign: 'center',
                        itemMargin: {
                            horizontal: 8,
                            vertical: 7
                        },
                        labels: {
                            colors: '#64748B'
                        },
                        markers: {
                            size: 7,
                            offsetX: -2,
                            offsetY: -.5,
                            shape: 'diamond'
                        }
                    }
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#hd_support_overview_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}