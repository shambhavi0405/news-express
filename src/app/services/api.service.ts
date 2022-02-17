import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
const httpHeader = new HttpHeaders();
httpHeader.set('Content-Type', 'Application/json');

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(
    private http: HttpClient
  ) { }
  private getParams(httpParams?: any): HttpParams{
    const apiKey = 'fd34733cd4ef4040942406ab759134ae';//'1f27383c4ee54efe8fc0067bcb90647b';//
    let params = new HttpParams();
    params = params.set('apiKey', apiKey)
    params = params.set('language', 'en')
    Object.keys(httpParams)?.forEach((ele: any) => {
      params =params.set(ele, httpParams[ele])
    });
    return params;
  }
  public getTopHeadline(httpParams?: any): Observable<any>{
    const params = this.getParams(httpParams);
    return this.http.get('https://newsapi.org/v2/top-headlines', { params });
  }
  public getArticles(httpParams?: any): Observable<any>{
    const params = this.getParams(httpParams);
    return this.http.get(`https://newsapi.org/v2/everything`, { params });
 }
}
