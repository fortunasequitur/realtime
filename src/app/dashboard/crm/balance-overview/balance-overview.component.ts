import { Component, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';
import { BalanceOverviewService } from './balance-overview.service';

@Component({
    selector: 'app-balance-overview',
    standalone: true,
    imports: [NgIf],
    templateUrl: './balance-overview.component.html',
    styleUrl: './balance-overview.component.scss'
})
export class BalanceOverviewComponent {

    constructor(
        private balanceOverviewService: BalanceOverviewService
    ) {}

    ngOnInit(): void {
        this.balanceOverviewService.loadChart();
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