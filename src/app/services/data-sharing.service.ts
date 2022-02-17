import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private refreshCategory = new Subject<String>();
  private refreshSearchQuery = new Subject<String>();
  constructor() { }
  public setCategory(category: String): void{
    this.refreshCategory.next(category);
  }
  public getCategory(): Observable<String>{
    return this.refreshCategory.asObservable();
  }
  public setSearchQuery(q: String): void{
    this.refreshSearchQuery.next(q);
  }
  public getSearchQuery(): Observable<String>{
    return this.refreshSearchQuery.asObservable();
  }
}
