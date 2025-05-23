import { Component, HostListener } from '@angular/core';
import { DeviceSessionsService } from './device-sessions.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-device-sessions',
    standalone: true,
    imports: [NgIf],
    templateUrl: './device-sessions.component.html',
    styleUrl: './device-sessions.component.scss'
})
export class DeviceSessionsComponent {

    constructor(
        private deviceSessionsService: DeviceSessionsService
    ) {}

    ngOnInit(): void {
        this.deviceSessionsService.loadChart();
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