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
        if (this.selectedDateFilter === 'custom' && this.customDateStart && this.customDateEnd) {
            this.conversionsService.getAllConversions('custom', this.customDateStart, this.customDateEnd).subscribe(data => {
                this.conversions = data || [];
                this.applyDateFilter();
            });
        } else {
            this.conversionsService.getAllConversions(this.selectedDateFilter).subscribe(data => {
                this.conversions = data || [];
                this.applyDateFilter();
            });
        }
    }

    applyDateFilter() {
        // Filter by selectedDateFilter or custom date
        let start: Date | null = null;
        let end: Date | null = null;
        const now = new Date();
        // Konversi ke WIB (UTC+7)
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const wibNow = new Date(utc + (7 * 60 * 60000));

        if (this.selectedDateFilter === 'today') {
            // Batas bawah: jam 00:00 hari ini UTC, batas atas: 23:59:59 hari ini UTC
            const today = new Date();
            start = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0, 0));
            end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999));
        } else if (this.selectedDateFilter === 'yesterday') {
            // Batas bawah: jam 00:00 kemarin UTC, batas atas: 23:59:59 kemarin UTC
            const today = new Date();
            const yesterday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 1, 0, 0, 0, 0));
            start = yesterday;
            end = new Date(Date.UTC(yesterday.getUTCFullYear(), yesterday.getUTCMonth(), yesterday.getUTCDate(), 23, 59, 59, 999));
        }
        let filtered = this.conversions;
        if (start && end) {
            filtered = this.conversions.filter(item => {
                if (!item.time) return false;
                // item.time diasumsikan UTC
                const itemDate = new Date(item.time.replace(' ', 'T') + 'Z');
                return itemDate >= start! && itemDate < end!;
            });
        } else if (this.selectedDateFilter !== 'today' && this.selectedDateFilter !== 'yesterday') {
            // Filter lain tetap seperti semula
            let s = '';
            let e = '';
            const today = new Date();
            if (this.selectedDateFilter === 'last7') {
                const utcLast7 = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 6));
                const utcToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
                s = utcLast7.toISOString().slice(0, 10);
                e = utcToday.toISOString().slice(0, 10);
            } else if (this.selectedDateFilter === 'thisMonth') {
                const first = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
                const utcToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
                s = first.toISOString().slice(0, 10);
                e = utcToday.toISOString().slice(0, 10);
            } else if (this.selectedDateFilter === 'lastMonth') {
                const first = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 1, 1));
                const last = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 0));
                s = first.toISOString().slice(0, 10);
                e = last.toISOString().slice(0, 10);
            }
            if (s && e) {
                filtered = this.conversions.filter(item => {
                    const t = item.time ? item.time.slice(0, 10) : '';
                    return t >= s && t <= e;
                });
            }
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
        this.loadConversions();
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
            this.selectedDateFilter = 'custom';
            this.loadConversions();
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