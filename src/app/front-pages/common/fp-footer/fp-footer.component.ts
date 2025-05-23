import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-fp-footer',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './fp-footer.component.html',
    styleUrl: './fp-footer.component.scss'
})
export class FpFooterComponent {}