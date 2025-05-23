import { Component } from '@angular/core';
import { FpFaqComponent } from '../common/fp-faq/fp-faq.component';
import { FpCtaComponent } from '../common/fp-cta/fp-cta.component';

@Component({
    selector: 'app-faq',
    standalone: true,
    imports: [FpFaqComponent, FpCtaComponent],
    templateUrl: './faq.component.html',
    styleUrl: './faq.component.scss'
})
export class FaqComponent {}