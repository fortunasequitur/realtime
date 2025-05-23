import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class EmergencyRoomVisitsService {

    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    public generateData(count:any, yrange:any) {
        var i = 0;
        var series = [];
        while (i < count) {
        var x = "W" + (i + 1).toString();
        var y =
            Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            series.push({
                x: x,
                y: y
            });
            i++;
        }
        return series;
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
                            name: "14 PM",
                            data: this.generateData(14, {
                                min: 0,
                                max: 90
                            })
                        },
                        {
                            name: "13 PM",
                            data: this.generateData(14, {
                                min: 0,
                                max: 90
                            })
                        },
                        {
                            name: "12 PM",
                            data: this.generateData(14, {
                                min: 0,
                                max: 90
                            })
                        },
                        {
                            name: "11 AM",
                            data: this.generateData(14, {
                                min: 0,
                                max: 90
                            })
                        },
                        {
                            name: "10 AM",
                            data: this.generateData(14, {
                                min: 0,
                                max: 90
                            })
                        },
                        {
                            name: "9 AM",
                            data: this.generateData(14, {
                                min: 0,
                                max: 90
                            })
                        },
                        {
                            name: "8 AM",
                            data: this.generateData(14, {
                                min: 0,
                                max: 90
                            })
                        }
                    ],
                    chart: {
                        height: 225,
                        type: "heatmap",
                        toolbar: {
                            show: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    colors: [
                        "#605DFF"
                    ],
                    grid: {
                        show: false,
                        borderColor: "#ECEEF2"
                    },
                    xaxis: {
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
                        labels: {
                            show: true,
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
                    }
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#emergency_room_visits_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}