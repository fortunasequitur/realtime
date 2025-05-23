import { Component, HostListener } from '@angular/core';
import { SessionsByChannelService } from './sessions-by-channel.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-sessions-by-channel',
    standalone: true,
    imports: [NgIf],
    templateUrl: './sessions-by-channel.component.html',
    styleUrl: './sessions-by-channel.component.scss'
})
export class SessionsByChannelComponent {

    constructor(
        private sessionsByChannelService: SessionsByChannelService
    ) {}

    ngOnInit(): void {
        this.sessionsByChannelService.loadChart();
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