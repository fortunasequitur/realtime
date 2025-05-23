import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-e-customer-details',
    standalone: true,
    imports: [RouterLink, NgIf],
    templateUrl: './e-customer-details.component.html',
    styleUrl: './e-customer-details.component.scss'
})
export class ECustomerDetailsComponent {

    // Card Header Menu
    isCardHeaderOpen = false;
    isCardHeaderOpen2 = false;
    toggleCardHeaderMenu() {
        this.isCardHeaderOpen = !this.isCardHeaderOpen;
    }
    toggleCardHeaderMenu2() {
        this.isCardHeaderOpen2 = !this.isCardHeaderOpen2;
    }
    @HostListener('document:click', ['$event'])
    handleClickOutside(event: Event) {
        const target = event.target as HTMLElement;
        if (!target.closest('.trezo-card-dropdown')) {
            this.isCardHeaderOpen = false;
        }
        if (!target.closest('.trezo-card-dropdown2')) {
            this.isCardHeaderOpen2 = false;
        }
    }

}