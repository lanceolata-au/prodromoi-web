import { env } from '$env/dynamic/public'
import { AttendanceApi } from './api/AttendanceApi';
import { FormationApi } from './api/FormationApi';


export class ProdromoiApi {
    
    attendance: AttendanceApi;
    formation: FormationApi;

    constructor() {
        this.attendance = new AttendanceApi(null, env.PUBLIC_API_HOST);
        this.formation = new FormationApi(null, env.PUBLIC_API_HOST);
    }

}