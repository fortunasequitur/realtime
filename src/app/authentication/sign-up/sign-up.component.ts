import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToggleService } from '../../common/header/toggle.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [RouterLink, NgClass],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

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

    // Password Show/Hide
    password: string = '';
    isPasswordVisible: boolean = false;
    togglePasswordVisibility(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
    }
    onPasswordInput(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        this.password = inputElement.value;
    }

}