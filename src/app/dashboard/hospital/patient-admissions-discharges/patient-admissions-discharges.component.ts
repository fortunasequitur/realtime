import { Component, HostListener } from '@angular/core';
import { PatientAdmissionsDischargesService } from './patient-admissions-discharges.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-patient-admissions-discharges',
    standalone: true,
    imports: [NgIf],
    templateUrl: './patient-admissions-discharges.component.html',
    styleUrl: './patient-admissions-discharges.component.scss'
})
export class PatientAdmissionsDischargesComponent {

    constructor(
        private patientAdmissionsDischargesService: PatientAdmissionsDischargesService
    ) {}

    ngOnInit(): void {
        this.patientAdmissionsDischargesService.loadChart();
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