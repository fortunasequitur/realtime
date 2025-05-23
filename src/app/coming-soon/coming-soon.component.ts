import { Component } from '@angular/core';
import { ToggleService } from '../common/header/toggle.service';

@Component({
    selector: 'app-coming-soon',
    standalone: true,
    imports: [],
    templateUrl: './coming-soon.component.html',
    styleUrl: './coming-soon.component.scss'
})
export class ComingSoonComponent {

    constructor(
        public toggleService: ToggleService
    ) {}

    ngOnInit(): void {
        // Initialize theme and direction on component load
        this.toggleService.initializeTheme();
    }

    // Toggle theme between light and dark
    toggleTheme() {
        this.toggleService.toggleTheme();
    }

    // Toggle direction between LTR and RTL
    toggleDirection() {
        this.toggleService.toggleDirection();
    }

}