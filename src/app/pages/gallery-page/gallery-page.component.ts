import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PopupGalleryComponent } from './popup-gallery/popup-gallery.component';

@Component({
    selector: 'app-gallery-page',
    standalone: true,
    imports: [RouterLink, PopupGalleryComponent],
    templateUrl: './gallery-page.component.html',
    styleUrl: './gallery-page.component.scss'
})
export class GalleryPageComponent {}