import { Component, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-recent-transactions',
    standalone: true,
    imports: [NgIf],
    templateUrl: './recent-transactions.component.html',
    styleUrl: './recent-transactions.component.scss'
})
export class RecentTransactionsComponent {

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