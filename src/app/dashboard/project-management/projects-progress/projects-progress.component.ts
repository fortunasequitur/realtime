import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ProjectsProgressService } from './projects-progress.service';

@Component({
    selector: 'app-projects-progress',
    standalone: true,
    imports: [NgIf],
    templateUrl: './projects-progress.component.html',
    styleUrl: './projects-progress.component.scss'
})
export class ProjectsProgressComponent {

    constructor(
        private projectsProgressService: ProjectsProgressService
    ) {}

    ngOnInit(): void {
        this.projectsProgressService.loadChart();
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