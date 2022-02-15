import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  addToStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getFromStorage(key: string): any {
    let data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  removeFromStorage(...keys: string[]): void {
    keys.forEach(key => {
      localStorage.removeItem(key);
    })
  }
}
