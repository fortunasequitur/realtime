import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgIf, NgFor, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConversionsService } from '../conversions-page/conversions.service';
import { TicketsResolvedComponent } from '../../dashboard/helpdesk/tickets-resolved/tickets-resolved.component';
import { TicketsInProgressComponent } from '../../dashboard/helpdesk/tickets-in-progress/tickets-in-progress.component';
import { TicketsDueComponent } from '../../dashboard/helpdesk/tickets-due/tickets-due.component';
import { TicketsNewOpenComponent } from '../../dashboard/helpdesk/tickets-new-open/tickets-new-open.component';

@Component({
    selector: 'app-performs-page',
    standalone: true,
    imports: [RouterLink, NgIf, NgFor, JsonPipe, FormsModule, TicketsResolvedComponent, TicketsInProgressComponent, TicketsDueComponent, TicketsNewOpenComponent],
    templateUrl: './performs-page.component.html',
    styleUrl: './performs-page.component.scss'
})
export class PerformsPageComponent implements OnInit {
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
    performsData: { subid: string, totalConversions: number, totalEarnings: number }[] = [];
    isLoading = false;
    // Pagination
    currentPage = 1;
    pageSize = 10;
    get totalPages() {
        return Math.ceil(this.performsData.length / this.pageSize) || 1;
    }
    get paginatedPerformsData() {
        const start = (this.currentPage - 1) * this.pageSize;
        return this.performsData.slice(start, start + this.pageSize);
    }
    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }
    // Summary
    get performsSummary() {
        const totalConversions = this.performsData.reduce((acc, item) => acc + item.totalConversions, 0);
        const totalEarnings = this.performsData.reduce((acc, item) => acc + item.totalEarnings, 0);
        return { totalConversions, totalEarnings };
    }
    pageTitle = 'Performs';
    hideCards = true;

    constructor(private conversionsService: ConversionsService) {}

    ngOnInit() {
        this.loadConversions();
    }

    loadConversions() {
        this.conversionsService.getAllConversions().subscribe(data => {
            this.conversions = data || [];
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
        let filtered = this.conversions;
        if (start && end) {
            filtered = this.conversions.filter(item => {
                const t = item.time ? item.time.slice(0, 10) : '';
                return t >= start && t <= end;
            });
        }
        // Group by subid
        const stats: { [key: string]: { subid: string, totalConversions: number, totalEarnings: number } } = {};
        for (const conv of filtered) {
            const subid = conv.subid || '-';
            const payout = parseFloat(conv.payout || 0);
            if (!stats[subid]) {
                stats[subid] = { subid, totalConversions: 0, totalEarnings: 0 };
            }
            stats[subid].totalConversions += 1;
            stats[subid].totalEarnings += payout;
        }
        this.performsData = Object.values(stats);
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
                let filtered = this.conversions.filter(item => {
                    const t = item.time ? item.time.slice(0, 10) : '';
                    return t >= this.customDateStart! && t <= this.customDateEnd!;
                });
                // Group by subid
                const stats: { [key: string]: { subid: string, totalConversions: number, totalEarnings: number } } = {};
                for (const conv of filtered) {
                    const subid = conv.subid || '-';
                    const payout = parseFloat(conv.payout || 0);
                    if (!stats[subid]) {
                        stats[subid] = { subid, totalConversions: 0, totalEarnings: 0 };
                    }
                    stats[subid].totalConversions += 1;
                    stats[subid].totalEarnings += payout;
                }
                this.performsData = Object.values(stats);
                this.currentPage = 1;
                this.isLoading = false;
            }, 1000);
        } else {
            this.applyDateFilter();
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