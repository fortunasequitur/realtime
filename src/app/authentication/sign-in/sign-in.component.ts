import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { ToggleService } from '../../common/header/toggle.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [CommonModule, RouterLink, NgClass, FormsModule],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
    username: string = '';
    password: string = '';
    isPasswordVisible: boolean = false;
    errorMessage: string = '';

    constructor(
        public toggleService: ToggleService,
        private router: Router
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

    // Password Show/Hide
    togglePasswordVisibility(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
    }

    onUsernameInput(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        this.username = inputElement.value;
    }

    onPasswordInput(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        this.password = inputElement.value;
    }

    onSubmit(event: Event): void {
        event.preventDefault();
        if (this.username === 'admin' && this.password === 'admin') {
            this.errorMessage = '';
            this.router.navigate(['/dashboard']);
        } else {
            this.errorMessage = 'Username atau password salah';
        }
    }
}