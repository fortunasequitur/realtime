import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ProjectsRoadmapService } from './projects-roadmap.service';

@Component({
    selector: 'app-projects-roadmap',
    standalone: true,
    imports: [NgIf],
    templateUrl: './projects-roadmap.component.html',
    styleUrl: './projects-roadmap.component.scss'
})
export class ProjectsRoadmapComponent {

    constructor(
        private projectsRoadmapService: ProjectsRoadmapService
    ) {}

    ngOnInit(): void {
        this.projectsRoadmapService.loadChart();
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