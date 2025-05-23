import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class BalanceOverviewService {

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
                        {
                            name: "Revenue",
                            data: [5, 12, 20, 23, 25, 30, 40, 45, 50, 70, 65, 80 ]
                        },
                        {
                            name: "Expenses",
                            data: [15, 20, 30, 30, 35, 45, 60, 70, 80, 85, 95, 120 ]
                        }
                    ],
                    chart: {
                        type: "area",
                        height: 350,
                        zoom: {
                            enabled: false
                        },
                        toolbar: {
                            show: true
                        }
                    },
                    colors: [
                        "#AD63F6", "#605DFF"
                    ],
                    dataLabels: {
                        enabled: false
                    },
                    grid: {
                        show: true,
                        borderColor: "#ECEEF2"
                    },
                    stroke: {
                        curve: "straight",
                        width: 2
                    },
                    xaxis: {
                        categories: [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec"
                        ],
                        axisTicks: {
                            show: false,
                            color: '#ECEEF2'
                        },
                        axisBorder: {
                            show: false,
                            color: '#ECEEF2'
                        },
                        labels: {
                            show: true,
                            style: {
                                colors: "#8695AA",
                                fontSize: "12px"
                            }
                        }
                    },
                    yaxis: {
                        tickAmount: 6,
                        max: 150,
                        min: 0,
                        labels: {
                            formatter: (val:any) => {
                                return '$' + val + 'k'
                            },
                            style: {
                                colors: "#64748B",
                                fontSize: "12px"
                            }
                        },
                        axisBorder: {
                            show: false,
                            color: '#ECEEF2'
                        },
                        axisTicks: {
                            show: false,
                            color: '#ECEEF2'
                        }
                    },
                    legend: {
                        show: true,
                        position: 'top',
                        fontSize: '12px',
                        horizontalAlign: 'left',
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
                    }
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#crm_balance_overview_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}