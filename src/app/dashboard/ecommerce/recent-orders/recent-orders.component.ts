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
            // Hitung batas waktu hari ini berdasarkan jam 07:00 WIB (UTC+7)
            const now = new Date();
            // Konversi ke WIB (UTC+7)
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const wibNow = new Date(utc + (7 * 60 * 60000));

            // Tentukan batas bawah (start) dan atas (end) untuk hari ini (07:00 WIB hari ini sampai 06:59 WIB besok)
            let startWIB = new Date(wibNow);
            startWIB.setHours(7, 0, 0, 0); // jam 07:00 WIB hari ini
            let endWIB = new Date(startWIB);
            endWIB.setDate(startWIB.getDate() + 1); // jam 07:00 WIB besok

            // Jika sekarang sebelum jam 07:00 WIB, berarti masih masuk hari kemarin
            if (wibNow < startWIB) {
                // Mundurkan 1 hari
                startWIB.setDate(startWIB.getDate() - 1);
                endWIB.setDate(endWIB.getDate() - 1);
            }

            // Filter data yang masuk di antara startWIB dan endWIB (pakai waktu UTC dari item.time)
            const filtered = (data || []).filter(item => {
                if (!item.time) return false;
                // item.time format: 'YYYY-MM-DD HH:mm:ss' (diasumsikan UTC)
                const itemDate = new Date(item.time.replace(' ', 'T') + 'Z');
                return itemDate >= startWIB && itemDate < endWIB;
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

    // Fungsi utilitas untuk konversi UTC ke WIB
    toWIB(utcString: string): string {
        if (!utcString) return '';
        const utcDate = new Date(utcString.replace(' ', 'T') + 'Z');
        // Tambah 7 jam
        const wibDate = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);
        // Format YYYY-MM-DD HH:mm:ss WIB
        const y = wibDate.getFullYear();
        const m = (wibDate.getMonth() + 1).toString().padStart(2, '0');
        const d = wibDate.getDate().toString().padStart(2, '0');
        const h = wibDate.getHours().toString().padStart(2, '0');
        const min = wibDate.getMinutes().toString().padStart(2, '0');
        const s = wibDate.getSeconds().toString().padStart(2, '0');
        return `${y}-${m}-${d} ${h}:${min}:${s} WIB`;
    }
}