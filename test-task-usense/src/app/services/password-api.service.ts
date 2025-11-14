import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordApiService {
  private apiUrl = 'https://api.api-ninjas.com/v1/passwordgenerator';

  private apiKey = 'NHW3MJ3siLw/hVs/YrgFmw==e8bkZN4xDrayR5YH';
  constructor(private http: HttpClient) {}

  generatePassword(
    length: number,
    includeNumbers: boolean,
    includeSymbols: boolean
  ): Observable<any> {

    let params = new HttpParams()
      .set('length', length.toString())
      .set('include_numbers', includeNumbers ? 'true' : 'false')
      .set('include_special_chars', includeSymbols ? 'true' : 'false');

    const headers = new HttpHeaders().set('X-Api-Key', this.apiKey);

    return this.http.get(this.apiUrl, { headers, params });
  }
}
