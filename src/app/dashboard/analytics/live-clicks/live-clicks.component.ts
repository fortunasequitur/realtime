import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { interval, switchMap } from 'rxjs';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-live-clicks',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './live-clicks.component.html',
  styleUrl: './live-clicks.component.scss'
})
export class LiveClicksComponent implements OnInit {
  clicks: any[] = [];
  isDarkMode = false;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    interval(5000).pipe(
      switchMap(() => this.http.get<any[]>('https://sobatdigital.online/api/visits_json.php'))
    ).subscribe(data => {
      this.clicks = data
        .filter(click => (click.org || '').indexOf('AS32934') === -1)
        .slice(0, 10)
        .map(click => {
          const os = this.getOSFromUserAgent(click.user_agent);
          return {
            time: click.timestamp ? click.timestamp.split(' ')[1] : '',
            sub_id: click.subsource,
            country: click.country,
            os,
            osIcon: this.getOSIcon(os),
            ip: click.ip,
            referer: click.referer,
            refIcon: this.getRefIcon(click.referer)
          };
        });
    });
    this.checkDarkMode();
    const observer = new MutationObserver(() => this.checkDarkMode());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  }

  checkDarkMode() {
    if (!this.isBrowser) return;
    this.isDarkMode = document.documentElement.classList.contains('dark');
  }

  getOSFromUserAgent(userAgent: string): string {
    if (!userAgent) return 'unknown';
    const ua = userAgent.toLowerCase();
    if (ua.includes('android')) return 'android';
    if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ios')) return 'ios';
    if (ua.includes('windows')) return 'windows';
    if (ua.includes('mac')) return 'mac';
    // Fallback log
    console.log('UA not detected:', userAgent);
    return 'unknown';
  }

  getOSIcon(os: string): string {
    switch (os) {
      case 'android': return 'assets/images/android.svg';
      case 'ios': return 'assets/images/apple.svg';
      case 'windows': return 'assets/images/window.svg';
      case 'mac': return 'assets/images/mac.svg';
      default: return '';
    }
  }

  getRefIcon(ref: string): string {
    if (!ref) return '';
    const refLower = ref.toLowerCase();
    if (refLower.includes('facebook')) return 'assets/images/socials/facebook.svg';
    if (refLower.includes('instagram') || refLower.includes('ig.')) return 'assets/images/socials/instagram.svg';
    if (refLower.includes('threads')) return 'assets/images/socials/threads.svg';
    return '';
  }
} 