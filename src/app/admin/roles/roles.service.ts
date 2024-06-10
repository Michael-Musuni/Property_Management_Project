import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/core/models/role';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  rolesUrl = `${environment.apiUrl}/api/v1/roles/`;

  public getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.rolesUrl + 'view');
  }

  addNewRole(data: any): Observable<any> {
    return this.http.post(this.rolesUrl + 'add', data, httpOptions);
  }
  public getPrivilege() {
    return this.http.get(`${environment.apiUrl}/api/v1/privilege/privileges`, httpOptions)
  }
  public upPrivilege(id:any) {
    return this.http.get(`${environment.apiUrl}/api/v1/privilege/assigned/privileges?roleId=${id}`, httpOptions)
  }
  public postPrivilege(event:any[],id:any) {
    console.log(event)
    return this.http.post(`${environment.apiUrl}/api/v1/privilege/attach-privilege-to-role?roleId=${id}`, event)
  }
  public removePrivilege(event:any[],id:any) {
    console.log(event)
    return this.http.post(`${environment.apiUrl}/api/v1/privilege/api/v1/privilege/update-privileges?roleId=${id}`, event)
  }

  addPrivilege(data:any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/api/v1/privilege/add`,data)
  }
  deleteRole(id: any): Observable<any> {
    return this.http.delete(this.rolesUrl + `delete/` + id, httpOptions);
  }
}
