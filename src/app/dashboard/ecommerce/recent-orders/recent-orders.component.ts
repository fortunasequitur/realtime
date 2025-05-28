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
        this.conversionsService.getAllConversions().subscribe(data => {
            // Hitung batas waktu hari ini berdasarkan jam 00:00-23:59 UTC
            const today = new Date();
            let startUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0, 0));
            let endUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999));

            // Filter data yang masuk di antara startUTC dan endUTC (pakai waktu UTC dari item.time)
            const filtered = (data || []).filter(item => {
                if (!item.time) return false;
                // item.time format: 'YYYY-MM-DD HH:mm:ss' (diasumsikan UTC)
                const itemDate = new Date(item.time.replace(' ', 'T') + 'Z');
                return itemDate >= startUTC && itemDate <= endUTC;
            });
            this.conversions = filtered.slice(0, 20);
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
}