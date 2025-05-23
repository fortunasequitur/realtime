import { Component, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';
import { OrderSummaryService } from './order-summary.service';

@Component({
    selector: 'app-order-summary',
    standalone: true,
    imports: [NgIf],
    templateUrl: './order-summary.component.html',
    styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent {

    constructor(
        private orderSummaryService: OrderSummaryService
    ) {}

    ngOnInit(): void {
        this.orderSummaryService.loadChart();
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