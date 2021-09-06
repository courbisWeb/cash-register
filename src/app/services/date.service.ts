import { Injectable } from '@angular/core';
import { DateModel } from '../models/date.model';
import { Observable, Subject, timer } from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() {
   }
}
