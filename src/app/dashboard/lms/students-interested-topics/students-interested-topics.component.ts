import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { StudentsInterestedTopicsService } from './students-interested-topics.service';

@Component({
    selector: 'app-students-interested-topics',
    standalone: true,
    imports: [NgIf],
    templateUrl: './students-interested-topics.component.html',
    styleUrl: './students-interested-topics.component.scss'
})
export class StudentsInterestedTopicsComponent {

    constructor(
        private studentsInterestedTopicsService: StudentsInterestedTopicsService
    ) {}

    ngOnInit(): void {
        this.studentsInterestedTopicsService.loadChart();
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