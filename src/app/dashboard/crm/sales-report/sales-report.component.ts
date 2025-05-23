import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { SalesReportService } from './sales-report.service';

@Component({
    selector: 'app-sales-report',
    standalone: true,
    imports: [NgIf],
    templateUrl: './sales-report.component.html',
    styleUrl: './sales-report.component.scss'
})
export class SalesReportComponent {

    constructor(
        private salesReportService: SalesReportService
    ) {}

    ngOnInit(): void {
        this.salesReportService.loadChart();
    }

    // Card Header Menu
    isCardHeaderOpen = false;
    toggleCardHeaderMenu() {
        this.isCardHeaderOpen = !this.isCardHeaderOpen;
    }
    @HostListener('document:click', ['$event'])
    handleClickOutside(event: Event) {
        const target = event.target as HTMLElement;
        if (!target.closest('.trezo-card-dropdown')) {
            this.isCardHeaderOpen = false;
        }
    }

}