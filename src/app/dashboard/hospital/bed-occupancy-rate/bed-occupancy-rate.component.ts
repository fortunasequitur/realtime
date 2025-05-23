import { Component, HostListener } from '@angular/core';
import { BedOccupancyRateService } from './bed-occupancy-rate.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-bed-occupancy-rate',
    standalone: true,
    imports: [NgIf],
    templateUrl: './bed-occupancy-rate.component.html',
    styleUrl: './bed-occupancy-rate.component.scss'
})
export class BedOccupancyRateComponent {

    constructor(
        private bedOccupancyRateService: BedOccupancyRateService
    ) {}

    ngOnInit(): void {
        this.bedOccupancyRateService.loadChart();
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