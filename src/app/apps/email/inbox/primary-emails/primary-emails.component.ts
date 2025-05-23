import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-primary-emails',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './primary-emails.component.html',
    styleUrl: './primary-emails.component.scss'
})
export class PrimaryEmailsComponent {}