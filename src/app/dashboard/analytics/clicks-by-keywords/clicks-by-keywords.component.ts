import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
    selector: 'app-clicks-by-keywords',
    standalone: true,
    imports: [CommonModule, HttpClientModule, RouterLink, NgIf],
    templateUrl: './clicks-by-keywords.component.html',
    styleUrl: './clicks-by-keywords.component.scss'
})
export class ClicksByKeywordsComponent implements OnInit {
    liveClicks: any[] = [];

    // Card Header Menu
    isCardHeaderOpen = false;
    toggleCardHeaderMenu() {
        this.isCardHeaderOpen = !this.isCardHeaderOpen;
    }
    @HostListener('document:click', ['$event'])
    handleClickOutside(event: Event) {
        const target = event.target as HTMLElement;
        if (!target.closest('.trezo-card-dropdown')) {
            this.isCardHeaderOpen = false;
        }
    }

    constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            interval(5000).pipe(
                switchMap(() => this.http.get<any[]>('https://sobatdigital.online/api/visits_json.php'))
            ).subscribe(data => {
                this.liveClicks = data;
            });
        }
    }
}