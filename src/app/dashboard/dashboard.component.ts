import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../common/footer/footer.component';
import { HeaderComponent } from '../common/header/header.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  closeSidebar() {
    document.body.classList.add('sidebar-hidden');
  }
}