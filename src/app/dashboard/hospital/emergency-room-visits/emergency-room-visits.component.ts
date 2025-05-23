import { Component, HostListener } from '@angular/core';
import { EmergencyRoomVisitsService } from './emergency-room-visits.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-emergency-room-visits',
    standalone: true,
    imports: [NgIf],
    templateUrl: './emergency-room-visits.component.html',
    styleUrl: './emergency-room-visits.component.scss'
})
export class EmergencyRoomVisitsComponent {

    constructor(
        private emergencyRoomVisitsService: EmergencyRoomVisitsService
    ) {}

    ngOnInit(): void {
        this.emergencyRoomVisitsService.loadChart();
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