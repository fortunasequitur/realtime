import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ClicksService {
  private apiUrl = 'https://sobatdigital.online/api/visits_json.php';

  constructor(private http: HttpClient) {}

  getAllClicks() {
    return this.http.get<any[]>(this.apiUrl);
  }
} 