import { Component, OnInit } from '@angular/core';
import { ConversionsService } from '../../../pages/conversions-page/conversions.service';
import { ClicksService } from '../../../services/clicks.service';

@Component({
    selector: 'app-welcome',
    standalone: true,
    imports: [],
    templateUrl: './welcome.component.html',
    styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit {
  greeting: string = '';
  subtitle: string = 'Bekerja Keraslah Sampai Tujuanmu Tercapai!';
  totalRevenueThisMonth: number = 0;
  totalConversionsThisMonth: number = 0;
  totalUniqueSubIdThisMonth: number = 0;

  constructor(
    private conversionsService: ConversionsService,
    private clicksService: ClicksService
  ) {
    this.setGreeting();
  }

  ngOnInit() {
    this.loadTotalRevenueThisMonth();
    this.loadTotalUniqueSubIdThisMonth();
  }

  setGreeting() {
    // Ambil waktu sekarang dalam GMT+7
    const now = new Date();
    // Konversi ke GMT+7
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const gmt7 = new Date(utc + (7 * 60 * 60000));
    const hour = gmt7.getHours();
    if (hour >= 0 && hour <= 12) {
      this.greeting = 'Selamat Pagi, Petarung!';
    } else if (hour > 12 && hour <= 15) {
      this.greeting = 'Selamat Siang, Petarung!';
    } else if (hour > 15 && hour <= 18) {
      this.greeting = 'Selamat Sore, Petarung!';
    } else {
      this.greeting = 'Selamat Malam, Petarung!';
    }
  }

  loadTotalRevenueThisMonth() {
    this.conversionsService.getAllConversions().subscribe(data => {
      if (!data || !Array.isArray(data)) {
        this.totalRevenueThisMonth = 0;
        this.totalConversionsThisMonth = 0;
        this.totalUniqueSubIdThisMonth = 0;
        return;
      }
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const filtered = data.filter(item => {
        if (!item.time) return false;
        const d = new Date(item.time);
        return d.getFullYear() === year && d.getMonth() === month;
      });
      this.totalRevenueThisMonth = filtered.reduce((sum, item) => sum + parseFloat(item.payout || 0), 0);
      this.totalConversionsThisMonth = filtered.length;
      const uniqueSubIds = new Set(filtered.map(item => (item.subid || '').trim().toLowerCase()).filter(x => x));
      this.totalUniqueSubIdThisMonth = uniqueSubIds.size;
    }, _err => {
      this.totalRevenueThisMonth = 0;
      this.totalConversionsThisMonth = 0;
      this.totalUniqueSubIdThisMonth = 0;
    });
  }

  loadTotalUniqueSubIdThisMonth() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    this.totalUniqueSubIdThisMonth = 0;
    this.clicksService.getAllClicks().subscribe((data: any[] = []) => {
      // Filter clicks bulan ini
      const filtered = data.filter(item => {
        if (!item.timestamp) return false;
        const date = new Date(item.timestamp);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      });
      // Ambil subsource unik (SUB ID)
      const uniqueSubIds = new Set(filtered.map(item => (item.subsource || '').trim().toLowerCase()).filter(x => x));
      this.totalUniqueSubIdThisMonth = uniqueSubIds.size;
    }, (_err: any) => {
      this.totalUniqueSubIdThisMonth = 0;
    });
  }
}