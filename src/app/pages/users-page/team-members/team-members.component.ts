import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-team-members',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './team-members.component.html',
    styleUrl: './team-members.component.scss'
})
export class TeamMembersComponent {}