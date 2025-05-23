import { Component, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-recent-customer-ratings',
    standalone: true,
    imports: [NgIf, RouterLink],
    templateUrl: './recent-customer-ratings.component.html',
    styleUrl: './recent-customer-ratings.component.scss'
})
export class RecentCustomerRatingsComponent {

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