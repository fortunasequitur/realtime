import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgIf, NgFor, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketsResolvedComponent } from '../../dashboard/helpdesk/tickets-resolved/tickets-resolved.component';
import { TicketsInProgressComponent } from '../../dashboard/helpdesk/tickets-in-progress/tickets-in-progress.component';
import { TicketsDueComponent } from '../../dashboard/helpdesk/tickets-due/tickets-due.component';
import { TicketsNewOpenComponent } from '../../dashboard/helpdesk/tickets-new-open/tickets-new-open.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { interval, switchMap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { ClicksService } from '../../services/clicks.service';
import { ConversionsService } from '../conversions-page/conversions.service';

@Component({
    selector: 'app-statistics-page',
    standalone: true,
    imports: [RouterLink, NgIf, NgFor, JsonPipe, FormsModule, TicketsResolvedComponent, TicketsInProgressComponent, TicketsDueComponent, TicketsNewOpenComponent, HttpClientModule],
    templateUrl: './statistics-page.component.html',
    styleUrl: './statistics-page.component.scss'
})
export class StatisticsPageComponent {
    classApplied = false;
    hideCards = false;
    pageTitle = 'Statistics';
    filteredStatisticsData: Array<{ subId: string; clicks: number; unique: number; conversions: number; earning: number }> = [];
    isLoading = false;
    // Pagination
    currentPage = 1;
    pageSize = 10;
    get totalPages() {
        return Math.ceil(this.filteredStatisticsData.length / this.pageSize) || 1;
    }
    get paginatedStatisticsData() {
        const start = (this.currentPage - 1) * this.pageSize;
        return this.filteredStatisticsData.slice(start, start + this.pageSize);
    }
    dateStart: string = '';
    dateEnd: string = '';

    // Summary
    get statisticsSummary() {
        return this.filteredStatisticsData.reduce((acc, item) => {
            acc.clicks += item.clicks;
            acc.unique += item.unique;
            acc.conversions += item.conversions || 0;
            acc.earning += item.earning || 0;
            return acc;
        }, { clicks: 0, unique: 0, conversions: 0, earning: 0 });
    }

    allClicks: any[] = [];
    allConversions: any[] = [];
    private isBrowser: boolean;

    selectedDateFilter = 'today';
    isDropdownOpen = false;
    dateOptions = [
        { value: 'today', label: 'Today' },
        { value: 'yesterday', label: 'Yesterday' },
        { value: 'last7', label: 'Last 7 Days' },
        { value: 'thisMonth', label: 'This Month' },
        { value: 'lastMonth', label: 'Last Month' }
    ];
    customDateStart: string | null = null;
    customDateEnd: string | null = null;

    constructor(
        private router: Router,
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object,
        private clicksService: ClicksService,
        private conversionsService: ConversionsService
    ) {
        this.router.events.subscribe(() => {
            this.updatePageState();
        });
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit() {
        if (this.isBrowser) {
            this.clicksService.getAllClicks().subscribe(clicks => {
                this.allClicks = clicks;
                this.conversionsService.getAllConversions().subscribe(convs => {
                    this.allConversions = convs;
                    this.updateStatisticsFromAllClicks();
                    this.selectDateFilter('today');
                });
            });
        }
    }

    updateStatisticsFromAllClicks() {
        this.updateStatisticsFromFilteredClicks(this.allClicks);
    }

    updateStatisticsFromFilteredClicks(clicks: any[]) {
        // Group by subsource, hitung total clicks, unique IP, conversions, earning
        const stats: { [key: string]: { subId: string, clicks: number, uniqueIps: Set<string>, conversions: number, earning: number } } = {};
        for (const click of clicks) {
            const subId = click.subsource || '-';
            const ip = click.ip || '-';
            if (!stats[subId]) {
                stats[subId] = { subId, clicks: 0, uniqueIps: new Set(), conversions: 0, earning: 0 };
            }
            stats[subId].clicks += 1;
            stats[subId].uniqueIps.add(ip);
        }
        // Hitung conversions dan earning dari allConversions
        for (const conv of this.allConversions) {
            const subId = (conv.subid || '-');
            if (!stats[subId]) continue;
            stats[subId].conversions += 1;
            stats[subId].earning += parseFloat(conv.payout || 0);
        }
        this.filteredStatisticsData = Object.values(stats).map(item => ({
            subId: item.subId,
            clicks: item.clicks,
            unique: item.uniqueIps.size,
            conversions: item.conversions,
            earning: item.earning
        }));
    }

    updatePageState() {
        const url = this.router.url;
        if (url.includes('/dashboard/statistics')) {
            this.hideCards = true;
            this.pageTitle = 'Statistics';
            // Jangan timpa filteredStatisticsData, biarkan updateStatisticsFromAllClicks yang handle
        } else {
            this.hideCards = false;
            this.pageTitle = 'Tickets';
        }
    }

    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    selectDateFilter(value: string) {
        this.selectedDateFilter = value;
        this.isDropdownOpen = false;
        const today = new Date();
        let start = '';
        let end = '';
        if (value === 'today') {
            // UTC+0
            const utcToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
            start = end = utcToday.toISOString().slice(0, 10);
        } else if (value === 'yesterday') {
            const utcYesterday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 1));
            start = end = utcYesterday.toISOString().slice(0, 10);
        } else if (value === 'last7') {
            const utcLast7 = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 6));
            const utcToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
            start = utcLast7.toISOString().slice(0, 10);
            end = utcToday.toISOString().slice(0, 10);
        } else if (value === 'thisMonth') {
            const first = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
            const utcToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
            start = first.toISOString().slice(0, 10);
            end = utcToday.toISOString().slice(0, 10);
        } else if (value === 'lastMonth') {
            const first = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 1, 1));
            const last = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 0));
            start = first.toISOString().slice(0, 10);
            end = last.toISOString().slice(0, 10);
        }
        if (start && end) {
            this.filterDataByDateRange(start, end);
        } else {
            this.updateStatisticsFromAllClicks();
        }
    }

    filterDataByDateRange(start: string, end: string) {
        const filtered = this.allClicks.filter(click => {
            if (!click.timestamp) return false;
            // Pastikan parsing dan perbandingan dalam UTC+0
            const clickDate = new Date(click.timestamp.replace(' ', 'T'));
            const clickDateUTC = new Date(Date.UTC(clickDate.getUTCFullYear(), clickDate.getUTCMonth(), clickDate.getUTCDate()));
            return clickDateUTC >= new Date(start + 'T00:00:00Z') && clickDateUTC <= new Date(end + 'T23:59:59Z');
        });
        this.updateStatisticsFromFilteredClicks(filtered);
    }

    getDateFilterLabel(value: string, customDate: string | null): string {
        const found = this.dateOptions.find(opt => opt.value === value);
        if (found) return found.label;
        return 'Select Date';
    }

    get dateRangeInvalid(): boolean {
        return !!this.customDateStart && !!this.customDateEnd && this.customDateEnd < this.customDateStart;
    }

    onLoadDateRange() {
        if (this.customDateStart && this.customDateEnd) {
            this.isLoading = true;
            setTimeout(() => {
                this.filterDataByDateRange(this.customDateStart!, this.customDateEnd!);
                this.isLoading = false;
            }, 1000);
        } else {
            this.updateStatisticsFromAllClicks();
        }
    }

    @HostListener('document:click', ['$event'])
    handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (!target.closest('.trezo-card-dropdown')) {
            this.isDropdownOpen = false;
        }
    }
} 