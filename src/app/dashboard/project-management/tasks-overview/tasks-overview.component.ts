import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { TasksOverviewService } from './tasks-overview.service';

@Component({
    selector: 'app-tasks-overview',
    standalone: true,
    imports: [NgIf],
    templateUrl: './tasks-overview.component.html',
    styleUrl: './tasks-overview.component.scss'
})
export class TasksOverviewComponent {

    constructor(
        private tasksOverviewService: TasksOverviewService
    ) {}

    ngOnInit(): void {
        this.tasksOverviewService.loadChart();
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