import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AmenitiesService {

  constructor(private httpClient: HttpClient) { }

  public getAmenities() {
    return this.httpClient.get(`${environment.apiUrl}/api/v1/amenities/amenities`, httpOptions)
  }
  addAmenities(data: any) {

    return this.httpClient.post(`${environment.apiUrl}/api/v1/amenities/add`, data)
  }
  updateAmenity(data: any) {
  
    return this.httpClient.put(`${environment.apiUrl}/api/v1/utilities/add`, data)
  }
}


// // http://3.140.250.115:9701/api/v1/auth/authenticate

// public login(user: any): Observable<Auth>{
//   return this.http.post<Auth>(`${environment.baseUrl}/api/v1/auth/authenticate`, user, httpOptions);
// }

