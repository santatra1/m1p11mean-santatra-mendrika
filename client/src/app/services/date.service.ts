import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  stringToHours(heure: string): Date{
    const heureDate = new Date();
    const [heures, minutes] = heure.split(':');
    heureDate.setHours(parseInt(heures, 10), parseInt(minutes, 10));
    return heureDate;
  }

  numberToHours(heure: number): Date{
    const heureDate = new Date();
    heureDate.setHours(heure, parseInt("00", 10));
    return heureDate;
  }

  toString(date: Date): string{
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
