import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { SupportOverviewService } from './support-overview.service';

@Component({
    selector: 'app-support-overview',
    standalone: true,
    imports: [NgIf],
    templateUrl: './support-overview.component.html',
    styleUrl: './support-overview.component.scss'
})
export class SupportOverviewComponent {

    constructor(
        private supportOverviewService: SupportOverviewService
    ) {}

    ngOnInit(): void {
        this.supportOverviewService.loadChart();
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