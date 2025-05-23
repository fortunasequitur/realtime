import { Component, OnInit } from '@angular/core';
import { ConversionsService } from '../../../pages/conversions-page/conversions.service';

@Component({
  selector: 'app-olivia-congrats',
  standalone: true,
  templateUrl: './olivia-congrats.component.html',
  styleUrl: './olivia-congrats.component.scss'
})
export class OliviaCongratsComponent implements OnInit {
  topSubId: string = '-';
  topSubIdConversions: number | string = '-';

  constructor(private conversionsService: ConversionsService) {}

  ngOnInit() {
    this.conversionsService.getAllConversions().subscribe(data => {
      if (!data || !Array.isArray(data)) {
        this.topSubId = '-';
        this.topSubIdConversions = '-';
        return;
      }
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      // Filter data bulan ini
      const filtered = data.filter(item => {
        if (!item.time) return false;
        const d = new Date(item.time);
        return d.getFullYear() === year && d.getMonth() === month;
      });
      // Hitung total conversion per subid
      const subIdCount: { [key: string]: number } = {};
      filtered.forEach(item => {
        const subid = (item.subid || '').trim();
        if (!subid) return;
        subIdCount[subid] = (subIdCount[subid] || 0) + 1;
      });
      // Cari subid dengan conversion terbanyak
      const top = Object.entries(subIdCount).sort((a, b) => b[1] - a[1])[0];
      if (top) {
        this.topSubId = top[0];
        this.topSubIdConversions = top[1];
      } else {
        this.topSubId = '-';
        this.topSubIdConversions = '-';
      }
    }, _err => {
      this.topSubId = '-';
      this.topSubIdConversions = '-';
    });
  }
} 