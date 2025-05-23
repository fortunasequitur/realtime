import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RevenueService } from './revenue.service';

@Component({
    selector: 'app-revenue',
    standalone: true,
    imports: [NgIf],
    templateUrl: './revenue.component.html',
    styleUrl: './revenue.component.scss'
})
export class RevenueComponent {

    constructor(
        private revenueService: RevenueService
    ) {}

    ngOnInit(): void {
        this.revenueService.loadChart();
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