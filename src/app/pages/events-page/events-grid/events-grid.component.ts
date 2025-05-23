import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-events-grid',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './events-grid.component.html',
    styleUrl: './events-grid.component.scss'
})
export class EventsGridComponent {}