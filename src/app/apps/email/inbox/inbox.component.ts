import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-inbox',
    standalone: true,
    imports: [RouterLink, NgIf, SidebarComponent, RouterOutlet, RouterLinkActive],
    templateUrl: './inbox.component.html',
    styleUrl: './inbox.component.scss'
})
export class InboxComponent {

    // Card Header Menu
    isCardHeaderOpen = false;
    isCardHeaderOpen2 = false;
    toggleCardHeaderMenu() {
        this.isCardHeaderOpen = !this.isCardHeaderOpen;
    }
    toggleCardHeaderMenu2() {
        this.isCardHeaderOpen2 = !this.isCardHeaderOpen2;
    }
    @HostListener('document:click', ['$event'])
    handleClickOutside(event: Event) {
        const target = event.target as HTMLElement;
        if (!target.closest('.trezo-card-dropdown')) {
            this.isCardHeaderOpen = false;
        }
        if (!target.closest('.trezo-card-dropdown2')) {
            this.isCardHeaderOpen2 = false;
        }
    }

}