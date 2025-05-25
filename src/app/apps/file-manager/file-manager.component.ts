import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-file-manager',
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    templateUrl: './file-manager.component.html',
    styleUrl: './file-manager.component.scss'
})
export class FileManagerComponent {}