import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environemnts/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) { }

  getTeamsList(params: any) {
    return this.http.get(`${environment.API_URL}/equipos/listar/` + params)
  }

  getTeamsListRangeDate(params: any) {
    return this.http.get(`${environment.API_URL}/equipos/consultar/` + params.firstDate + '/' + params.secondDate)
  }

  setNewTeam(params:any) {
    return this.http.post(`${environment.API_URL}/equipos/crear/`, params)
  }

  updateTeam(id:number, data: any) {
    return this.http.put(`${environment.API_URL}/equipos/actualizar/${id}`, data)
  }

  deleteTeam(id:number) {
    return this.http.delete(`${environment.API_URL}/equipos/eliminar/${id}`)
  }
}
