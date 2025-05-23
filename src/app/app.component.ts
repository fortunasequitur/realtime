import { Component } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RouterOutlet, Router, Event, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    title = 'Trezo - Angular 18 Tailwind CSS Admin Dashboard Template';

    constructor(
        private router: Router,
        private viewportScroller: ViewportScroller,
        private titleService: Title
    ) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                // Scroll to the top after each navigation end
                this.viewportScroller.scrollToPosition([0, 0]);
                // Set meta title
                if (this.router.url.startsWith('/dashboard')) {
                    this.titleService.setTitle('GILANG TEAM');
                } else {
                    this.titleService.setTitle('Login - GILANG TEAM');
                }
            }
        });
    }

}