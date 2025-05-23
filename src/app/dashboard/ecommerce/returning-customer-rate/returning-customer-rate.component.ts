import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ReturningCustomerRateService } from './returning-customer-rate.service';

@Component({
    selector: 'app-returning-customer-rate',
    standalone: true,
    imports: [NgIf],
    templateUrl: './returning-customer-rate.component.html',
    styleUrl: './returning-customer-rate.component.scss'
})
export class ReturningCustomerRateComponent {

    constructor(
        private returningCustomerRateService: ReturningCustomerRateService
    ) {}

    ngOnInit(): void {
        this.returningCustomerRateService.loadChart();
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