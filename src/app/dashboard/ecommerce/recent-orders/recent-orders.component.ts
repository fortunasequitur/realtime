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

    constructor(private conversionsService: ConversionsService) {}

    ngOnInit() {
        this.conversionsService.getAllConversions().subscribe(data => {
            this.conversions = (data || []).slice(0, 20);
        });
        // Tambahkan interval untuk auto-refresh data
        setInterval(() => {
            this.conversionsService.getAllConversions().subscribe(data => {
                this.conversions = (data || []).slice(0, 20);
            });
        }, 5000); // refresh setiap 5 detik
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