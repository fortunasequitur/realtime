import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ConversionsService {
  private apiUrl = 'https://sobatdigital.online/api/get_conversions.php';
  constructor(private http: HttpClient) {}
  getAllConversions(filter: string = 'today', start?: string, end?: string) {
    let url = this.apiUrl + '?filter=' + filter;
    if (filter === 'custom' && start && end) {
      url += `&start=${start}&end=${end}`;
    }
    return this.http.get<any[]>(url);
  }
} 