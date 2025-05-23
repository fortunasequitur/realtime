import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { interval, switchMap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-sales-by-locations',
    standalone: true,
    imports: [NgIf, CommonModule, HttpClientModule],
    templateUrl: './sales-by-locations.component.html',
    styleUrl: './sales-by-locations.component.scss'
})
export class SalesByLocationsComponent implements OnInit {
    isCardHeaderOpen = false;
    rankings: { country: string, count: number, percent: number }[] = [];

    constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            interval(5000).pipe(
                switchMap(() => this.http.get<any[]>('https://realtime.jobsy.biz.id/api/live-stats.php'))
            ).subscribe(data => {
                this.rankings = this.getCountryRankings(data);
            });
        }
    }

    getCountryRankings(clicks: any[]): { country: string, count: number, percent: number }[] {
        const countryCount: { [key: string]: number } = {};
        for (const click of clicks) {
            if (click.country) {
                countryCount[click.country] = (countryCount[click.country] || 0) + 1;
            }
        }
        const total = Object.values(countryCount).reduce((a, b) => a + b, 0) || 1;
        return Object.entries(countryCount)
            .map(([country, count]) => ({ country, count, percent: Math.round((count / total) * 100) }))
            .sort((a, b) => b.count - a.count);
    }

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
}