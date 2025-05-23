import { Component, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';
import { LeadsBySourceService } from './leads-by-source.service';

@Component({
    selector: 'app-leads-by-source:not(1)',
    standalone: true,
    imports: [NgIf],
    templateUrl: './leads-by-source.component.html',
    styleUrl: './leads-by-source.component.scss'
})
export class LeadsBySourceComponent {

    constructor(
        private leadsBySourceService: LeadsBySourceService
    ) {}

    ngOnInit(): void {
        this.leadsBySourceService.loadChart();
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