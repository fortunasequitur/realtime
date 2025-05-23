import { Component, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';
import { CoursesSalesService } from './courses-sales.service';

@Component({
    selector: 'app-courses-sales',
    standalone: true,
    imports: [NgIf],
    templateUrl: './courses-sales.component.html',
    styleUrl: './courses-sales.component.scss'
})
export class CoursesSalesComponent {

    constructor(
        private coursesSalesService: CoursesSalesService
    ) {}

    ngOnInit(): void {
        this.coursesSalesService.loadChart();
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