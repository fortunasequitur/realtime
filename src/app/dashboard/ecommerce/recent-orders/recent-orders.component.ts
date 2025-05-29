import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ConversionsService } from '../../../pages/conversions-page/conversions.service';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-recent-orders',
    standalone: true,
    imports: [RouterLink, NgIf, CommonModule],
    templateUrl: './recent-orders.component.html',
    styleUrl: './recent-orders.component.scss'
})
export class RecentOrdersComponent implements OnInit {
    conversions: any[] = [];
    totalEarningToday: number = 0;

    constructor(private conversionsService: ConversionsService) {}

    ngOnInit() {
        this.loadConversions();
        // Tambahkan interval untuk auto-refresh data
        setInterval(() => {
            this.loadConversions();
        }, 5000); // refresh setiap 5 detik
    }

    loadConversions() {
        this.conversionsService.getAllConversions('today').subscribe(data => {
            // Filter di frontend: hanya data dengan tanggal hari ini UTC
            const todayUtc = new Date();
            const todayStr = todayUtc.toISOString().slice(0, 10); // 'YYYY-MM-DD'
            this.conversions = (data || [])
                .filter(item => item.time && item.time.slice(0, 10) === todayStr)
                .slice(0, 20);
            this.updateTotalEarningToday();
        });
    }

    updateTotalEarningToday() {
        // Sudah pasti hanya data hari ini yang ada di this.conversions
        this.totalEarningToday = this.conversions
            .reduce((sum, item) => sum + parseFloat(item.payout || 0), 0);
    }

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

    // Tambahkan fungsi ini
    formatUtcTime(utcString: string): string {
        if (!utcString) return '';
        return utcString + ' UTC';
    }
}