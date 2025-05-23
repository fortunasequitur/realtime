import { Component, HostListener } from '@angular/core';
import { RecentEarningsService } from './recent-earnings.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-recent-earnings',
    standalone: true,
    imports: [NgIf],
    templateUrl: './recent-earnings.component.html',
    styleUrl: './recent-earnings.component.scss'
})
export class RecentEarningsComponent {

    constructor(
        private recentEarningsService: RecentEarningsService
    ) {}

    ngOnInit(): void {
        this.recentEarningsService.loadChart();
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