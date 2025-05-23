import { Component, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';
import { TicketsStatusService } from './tickets-status.service';

@Component({
    selector: 'app-tickets-status',
    standalone: true,
    imports: [NgIf],
    templateUrl: './tickets-status.component.html',
    styleUrl: './tickets-status.component.scss'
})
export class TicketsStatusComponent {

    constructor(
        private ticketsStatusService: TicketsStatusService
    ) {}

    ngOnInit(): void {
        this.ticketsStatusService.loadChart();
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