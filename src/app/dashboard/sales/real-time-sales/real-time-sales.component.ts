import { Component, HostListener } from '@angular/core';
import { RealTimeSalesService } from './real-time-sales.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-real-time-sales',
    standalone: true,
    imports: [NgIf],
    templateUrl: './real-time-sales.component.html',
    styleUrl: './real-time-sales.component.scss'
})
export class RealTimeSalesComponent {

    constructor(
        private realTimeSalesService: RealTimeSalesService
    ) {}

    ngOnInit(): void {
        this.realTimeSalesService.loadChart();
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