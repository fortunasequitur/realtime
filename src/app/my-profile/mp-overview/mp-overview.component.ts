import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MpOverviewService } from './mp-overview.service';

@Component({
    selector: 'app-mp-overview',
    standalone: true,
    imports: [NgIf],
    templateUrl: './mp-overview.component.html',
    styleUrl: './mp-overview.component.scss'
})
export class MpOverviewComponent {

    constructor(
        private mpOverviewService: MpOverviewService
    ) {}

    ngOnInit(): void {
        this.mpOverviewService.loadChart();
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