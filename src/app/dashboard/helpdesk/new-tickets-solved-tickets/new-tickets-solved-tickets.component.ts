import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NewTicketsSolvedTicketsService } from './new-tickets-solved-tickets.service';

@Component({
    selector: 'app-new-tickets-solved-tickets',
    standalone: true,
    imports: [NgIf],
    templateUrl: './new-tickets-solved-tickets.component.html',
    styleUrl: './new-tickets-solved-tickets.component.scss'
})
export class NewTicketsSolvedTicketsComponent {

    constructor(
        private newTicketsSolvedTicketsService: NewTicketsSolvedTicketsService
    ) {}

    ngOnInit(): void {
        this.newTicketsSolvedTicketsService.loadChart();
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