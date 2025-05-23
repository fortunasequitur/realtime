import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-schedule-appointment',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './schedule-appointment.component.html',
    styleUrl: './schedule-appointment.component.scss'
})
export class ScheduleAppointmentComponent {}