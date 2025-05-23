import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { TotalSalesService } from './total-sales.service';

@Component({
    selector: 'app-total-sales',
    standalone: true,
    imports: [NgIf],
    templateUrl: './total-sales.component.html',
    styleUrl: './total-sales.component.scss'
})
export class TotalSalesComponent {

    constructor(
        private totalSalesService: TotalSalesService
    ) {}

    ngOnInit(): void {
        this.totalSalesService.loadChart();
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