import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-pm-clients',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './pm-clients.component.html',
    styleUrl: './pm-clients.component.scss'
})
export class PmClientsComponent {}