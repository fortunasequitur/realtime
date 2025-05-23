import { Component, HostListener } from '@angular/core';
import { PatientByAgeService } from './patient-by-age.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-patient-by-age',
    standalone: true,
    imports: [NgIf],
    templateUrl: './patient-by-age.component.html',
    styleUrl: './patient-by-age.component.scss'
})
export class PatientByAgeComponent {

    constructor(
        private patientByAgeService: PatientByAgeService
    ) {}

    ngOnInit(): void {
        this.patientByAgeService.loadChart();
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