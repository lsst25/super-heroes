import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  addToStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getFromStorage(key: string) {
    let data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  removeFromStorage(...keys: string[]) {
    keys.forEach(key => {
      localStorage.removeItem(key);
    })
  }
}
