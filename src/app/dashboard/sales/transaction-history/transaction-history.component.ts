import { Component, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-transaction-history',
    standalone: true,
    imports: [NgIf],
    templateUrl: './transaction-history.component.html',
    styleUrl: './transaction-history.component.scss'
})
export class TransactionHistoryComponent {

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