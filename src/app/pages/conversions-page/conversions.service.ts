import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ConversionsService {
  private apiUrl = 'https://sobatdigital.online/api/get_conversions.php';
  constructor(private http: HttpClient) {}
  getAllConversions() {
    return this.http.get<any[]>(this.apiUrl);
  }
} 