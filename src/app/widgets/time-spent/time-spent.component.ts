import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { TimeSpentService } from './time-spent.service';

@Component({
    selector: 'app-time-spent:not(1)',
    standalone: true,
    imports: [NgIf],
    templateUrl: './time-spent.component.html',
    styleUrl: './time-spent.component.scss'
})
export class TimeSpentComponent {

    constructor(
        private timeSpentService: TimeSpentService
    ) {}

    ngOnInit(): void {
        this.timeSpentService.loadChart();
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