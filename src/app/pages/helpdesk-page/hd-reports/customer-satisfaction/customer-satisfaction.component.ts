import { Component, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';
import { CustomerSatisfactionService } from './customer-satisfaction.service';

@Component({
    selector: 'app-customer-satisfaction',
    standalone: true,
    imports: [NgIf],
    templateUrl: './customer-satisfaction.component.html',
    styleUrl: './customer-satisfaction.component.scss'
})
export class CustomerSatisfactionComponent {

    constructor(
        private customerSatisfactionService: CustomerSatisfactionService
    ) {}

    ngOnInit(): void {
        this.customerSatisfactionService.loadChart();
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