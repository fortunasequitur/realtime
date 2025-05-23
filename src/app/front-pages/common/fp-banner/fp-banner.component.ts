import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-fp-banner',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './fp-banner.component.html',
    styleUrl: './fp-banner.component.scss'
})
export class FpBannerComponent {}