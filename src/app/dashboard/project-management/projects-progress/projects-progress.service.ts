import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ProjectsProgressService {

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
                            name: "Completed",
                            data: [70, 23, 45, 30, 62, 70]
                        },
                        {
                            name: "In Progress",
                            data: [15, 40, 37, 38, 80, 45]
                        },
                        {
                            name: "Not Start Yet",
                            data: [50, 11, 60, 15, 31, 30]
                        },
                        {
                            name: "Cancelled",
                            data: [30, 60, 25, 22, 50, 15]
                        }
                    ],
                    chart: {
                        height: 325,
                        type: "line",
                        zoom: {
                            enabled: false
                        },
                        toolbar: {
                            show: true
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    colors: [
                        "#605DFF", "#FE7A36", "#AD63F6", "#D71C00"
                    ],
                    stroke: {
                        curve: "smooth",
                        width: 2
                    },
                    grid: {
                        show: true,
                        borderColor: "#ECEEF2"
                    },
                    markers: {
                        size: 4,
                        strokeWidth: 0,
                        shape: ["circle", "square", "circle", "square"],
                        hover: {
                            size: 5
                        }
                    },
                    xaxis: {
                        categories: [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun"
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
                        tickAmount: 5,
                        max: 100,
                        min: 0,
                        labels: {
                            formatter: (val:any) => {
                                return val + '%'
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
                const chart = new ApexCharts(document.querySelector('#pm_projects_progress_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}