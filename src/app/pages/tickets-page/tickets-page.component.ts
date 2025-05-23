import { Component, HostListener } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgIf, NgFor, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketsResolvedComponent } from '../../dashboard/helpdesk/tickets-resolved/tickets-resolved.component';
import { TicketsInProgressComponent } from '../../dashboard/helpdesk/tickets-in-progress/tickets-in-progress.component';
import { TicketsDueComponent } from '../../dashboard/helpdesk/tickets-due/tickets-due.component';
import { TicketsNewOpenComponent } from '../../dashboard/helpdesk/tickets-new-open/tickets-new-open.component';

@Component({
    selector: 'app-tickets-page',
    standalone: true,
    imports: [RouterLink, NgIf, NgFor, JsonPipe, FormsModule, TicketsResolvedComponent, TicketsInProgressComponent, TicketsDueComponent, TicketsNewOpenComponent],
    templateUrl: './tickets-page.component.html',
    styleUrl: './tickets-page.component.scss'
})
export class TicketsPageComponent {
    classApplied = false;
    hideCards = false;
    pageTitle = 'Tickets';
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
    statisticsData = [
        { date: '2025-05-01', subId: 'SUB-101', clicks: 100, leads: 10, earning: 50 },
        { date: '2025-05-02', subId: 'SUB-102', clicks: 120, leads: 12, earning: 60 },
        { date: '2025-05-03', subId: 'SUB-103', clicks: 130, leads: 13, earning: 65 },
        { date: '2025-05-04', subId: 'SUB-104', clicks: 140, leads: 14, earning: 70 },
        { date: '2025-05-05', subId: 'SUB-105', clicks: 150, leads: 15, earning: 75 },
        { date: '2025-05-06', subId: 'SUB-106', clicks: 160, leads: 16, earning: 80 },
        { date: '2025-05-07', subId: 'SUB-107', clicks: 170, leads: 17, earning: 85 },
        { date: '2025-05-08', subId: 'SUB-108', clicks: 180, leads: 18, earning: 90 },
        { date: '2025-05-09', subId: 'SUB-109', clicks: 190, leads: 19, earning: 95 },
        { date: '2025-05-10', subId: 'SUB-110', clicks: 200, leads: 20, earning: 100 },
        { date: '2025-05-11', subId: 'SUB-111', clicks: 210, leads: 21, earning: 105 },
        { date: '2025-05-12', subId: 'SUB-112', clicks: 220, leads: 22, earning: 110 },
        { date: '2025-05-13', subId: 'SUB-113', clicks: 230, leads: 23, earning: 115 },
    ];
    filteredStatisticsData = [...this.statisticsData];
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
    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }
    // Summary
    get statisticsSummary() {
        return this.filteredStatisticsData.reduce((acc, item) => {
            acc.clicks += item.clicks;
            acc.leads += item.leads;
            acc.earning += item.earning;
            return acc;
        }, { clicks: 0, leads: 0, earning: 0 });
    }

    constructor(private router: Router) {
        this.router.events.subscribe(() => {
            this.updatePageState();
        });
        this.updatePageState();
    }

    updatePageState() {
        const url = this.router.url;
        if (url.includes('/dashboard/statistics')) {
            this.hideCards = true;
            this.pageTitle = 'Statistics';
        } else if (url.includes('/dashboard/conversions')) {
            this.hideCards = true;
            this.pageTitle = 'Conversions';
        } else if (url.includes('/dashboard/performs')) {
            this.hideCards = true;
            this.pageTitle = 'Performs';
        } else if (url.includes('/dashboard/short-gen')) {
            this.hideCards = true;
            this.pageTitle = 'Short Gen';
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
        if (this.pageTitle === 'Statistics' || this.pageTitle === 'Conversions' || this.pageTitle === 'Performs') {
            const today = new Date();
            let start = '';
            let end = '';
            if (value === 'today') {
                start = end = today.toISOString().slice(0, 10);
            } else if (value === 'yesterday') {
                const yest = new Date(today);
                yest.setDate(today.getDate() - 1);
                start = end = yest.toISOString().slice(0, 10);
            } else if (value === 'last7') {
                const last7 = new Date(today);
                last7.setDate(today.getDate() - 6);
                start = last7.toISOString().slice(0, 10);
                end = today.toISOString().slice(0, 10);
            } else if (value === 'thisMonth') {
                const first = new Date(today.getFullYear(), today.getMonth(), 1);
                start = first.toISOString().slice(0, 10);
                end = today.toISOString().slice(0, 10);
            } else if (value === 'lastMonth') {
                const first = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                const last = new Date(today.getFullYear(), today.getMonth(), 0);
                start = first.toISOString().slice(0, 10);
                end = last.toISOString().slice(0, 10);
            }
            if (start && end) {
                this.filteredStatisticsData = this.statisticsData.filter(item => item.date >= start && item.date <= end);
                this.currentPage = 1;
            } else {
                this.filteredStatisticsData = [...this.statisticsData];
                this.currentPage = 1;
            }
        }
    }

    getDateFilterLabel(value: string, customDate: string | null): string {
        const found = this.dateOptions.find(opt => opt.value === value);
        if (found) return found.label;
        return 'Select Date';
    }

    @HostListener('document:click', ['$event'])
    handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (!target.closest('.trezo-card-dropdown')) {
            this.isDropdownOpen = false;
        }
    }

    get dateRangeInvalid(): boolean {
        return !!this.customDateStart && !!this.customDateEnd && this.customDateEnd < this.customDateStart;
    }

    onLoadDateRange() {
        if ((this.pageTitle === 'Statistics' || this.pageTitle === 'Conversions' || this.pageTitle === 'Performs') && this.customDateStart && this.customDateEnd) {
            this.isLoading = true;
            setTimeout(() => {
                const start = this.customDateStart || '';
                const end = this.customDateEnd || '';
                this.filteredStatisticsData = this.statisticsData.filter(item => item.date >= start && item.date <= end);
                this.currentPage = 1;
                this.isLoading = false;
            }, 1000); // simulasi loading 1 detik
        } else {
            this.filteredStatisticsData = [...this.statisticsData];
            this.currentPage = 1;
        }
    }
} 