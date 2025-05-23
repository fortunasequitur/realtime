import { Component, HostListener } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgIf, NgFor, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketsResolvedComponent } from '../../dashboard/helpdesk/tickets-resolved/tickets-resolved.component';
import { TicketsInProgressComponent } from '../../dashboard/helpdesk/tickets-in-progress/tickets-in-progress.component';
import { TicketsDueComponent } from '../../dashboard/helpdesk/tickets-due/tickets-due.component';
import { TicketsNewOpenComponent } from '../../dashboard/helpdesk/tickets-new-open/tickets-new-open.component';
import { ConversionsService } from './conversions.service';

@Component({
    selector: 'app-conversions-page',
    standalone: true,
    imports: [RouterLink, NgIf, NgFor, JsonPipe, FormsModule, TicketsResolvedComponent, TicketsInProgressComponent, TicketsDueComponent, TicketsNewOpenComponent],
    templateUrl: './conversions-page.component.html',
    styleUrl: './conversions-page.component.scss'
})
export class ConversionsPageComponent {
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
    conversions: any[] = [];
    filteredConversions: any[] = [];
    isLoading = false;
    // Pagination
    currentPage = 1;
    pageSize = 10;
    get totalPages() {
        return Math.ceil(this.filteredConversions.length / this.pageSize) || 1;
    }
    get paginatedConversions() {
        const start = (this.currentPage - 1) * this.pageSize;
        return this.filteredConversions.slice(start, start + this.pageSize);
    }
    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }
    // Summary
    get statisticsSummary() {
        return this.filteredConversions.reduce((acc, item) => {
            acc.clicks += 1;
            acc.earning += parseFloat(item.payout || 0);
            return acc;
        }, { clicks: 0, earning: 0 });
    }

    constructor(private router: Router, private conversionsService: ConversionsService) {
        this.router.events.subscribe(() => {
            this.updatePageState();
        });
        this.updatePageState();
        this.selectDateFilter('today');
    }

    ngOnInit() {
        this.conversionsService.getAllConversions().subscribe(data => {
            this.conversions = data;
            this.applyDateFilter();
        });
    }

    applyDateFilter() {
        // Filter by selectedDateFilter or custom date
        let start = '';
        let end = '';
        const today = new Date();
        if (this.selectedDateFilter === 'today') {
            start = end = today.toISOString().slice(0, 10);
        } else if (this.selectedDateFilter === 'yesterday') {
            const yest = new Date(today);
            yest.setDate(today.getDate() - 1);
            start = end = yest.toISOString().slice(0, 10);
        } else if (this.selectedDateFilter === 'last7') {
            const last7 = new Date(today);
            last7.setDate(today.getDate() - 6);
            start = last7.toISOString().slice(0, 10);
            end = today.toISOString().slice(0, 10);
        } else if (this.selectedDateFilter === 'thisMonth') {
            const first = new Date(today.getFullYear(), today.getMonth(), 1);
            start = first.toISOString().slice(0, 10);
            end = today.toISOString().slice(0, 10);
        } else if (this.selectedDateFilter === 'lastMonth') {
            const first = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            const last = new Date(today.getFullYear(), today.getMonth(), 0);
            start = first.toISOString().slice(0, 10);
            end = last.toISOString().slice(0, 10);
        }
        if (start && end) {
            this.filteredConversions = this.conversions.filter(item => {
                const t = item.time ? item.time.slice(0, 10) : '';
                return t >= start && t <= end;
            });
        } else {
            this.filteredConversions = [...this.conversions];
        }
        this.currentPage = 1;
    }

    selectDateFilter(value: string) {
        this.selectedDateFilter = value;
        this.isDropdownOpen = false;
        this.applyDateFilter();
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
                this.filteredConversions = this.conversions.filter(item => {
                    const t = item.time ? item.time.slice(0, 10) : '';
                    return t >= this.customDateStart! && t <= this.customDateEnd!;
                });
                this.currentPage = 1;
                this.isLoading = false;
            }, 1000);
        } else {
            this.filteredConversions = [...this.conversions];
            this.currentPage = 1;
        }
    }

    @HostListener('document:click', ['$event'])
    handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (!target.closest('.trezo-card-dropdown')) {
            this.isDropdownOpen = false;
        }
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
} 