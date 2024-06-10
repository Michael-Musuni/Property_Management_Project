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
export class UtilitiesService {

  constructor(private httpClient: HttpClient) { }

 getUtilities() {
    return this.httpClient.get(`${environment.apiUrl}/api/v1/utilities/utilities`, httpOptions)
  }
  addUtilities(data: any) {
  
    return this.httpClient.post(`${environment.apiUrl}/api/v1/utilities/add`, data)
  }
  updateUtility(id: any,data: any): Observable<any> {
  console.log("this"+id)
    return this.httpClient.put(`${environment.apiUrl}/api/v1/utilities/update?id=${id}`,data)
  }
  public deleteUtility(id: any): Observable<any>{
    return this.httpClient.delete(`${environment.apiUrl}/api/v1/utilities/delete?id=${id}`)
  }
}
