import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ToggleService } from '../../common/header/toggle.service';

@Component({
    selector: 'app-logout',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './logout.component.html',
    styleUrl: './logout.component.scss'
})
export class LogoutComponent {

    constructor(
        public toggleService: ToggleService,
        private router: Router
    ) {}

    ngOnInit(): void {
        // Initialize theme and direction on component load
        this.toggleService.initializeTheme();
        // Hapus session/token di sini jika ada
        this.router.navigate(['/authentication']);
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