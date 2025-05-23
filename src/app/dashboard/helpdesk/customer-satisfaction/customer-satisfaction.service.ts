import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class CustomerSatisfactionService {

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
                    series: [50, 15, 75, 50],
                    chart: {
                        height: 152,
                        type: "donut"
                    },
                    labels: [
                        "Highly Satisfied", "Satisfied", "Low Satisfied", "Unsatisfied"
                    ],
                    colors: [
                        "#AD63F6", "#C2CDFF", "#FFAA72", "#0dcaf0"
                    ],
                    stroke: {
                        width: 1,
                        show: true,
                        colors: ["transparent"]
                    },
                    legend: {
                        show: false,
                        position: 'top',
                        fontSize: '12px',
                        horizontalAlign: 'center',
                        itemMargin: {
                            horizontal: 8,
                            vertical: 0
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
                    },
                    plotOptions: {
                        pie: {
                            expandOnClick: false,
                            donut: {
                                size: '73%',
                                labels: {
                                    show: false,
                                    name: {
                                        color: '#64748B'
                                    },
                                    value: {
                                        show: true,
                                        color: '#3A4252',
                                        fontSize: '28px',
                                        fontWeight: '600'
                                    },
                                    total: {
                                        show: true,
                                        color: '#64748B'
                                    }
                                }
                            }
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    tooltip: {
                        enabled: true,
                        y: {
                            formatter: function(val:any) {
                                return val + "%";
                            }
                        }
                    }
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#hd_customer_satisfaction_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}