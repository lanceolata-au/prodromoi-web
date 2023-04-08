import { env } from '$env/dynamic/public'
import { AttendanceApi } from './api/AttendanceApi';


export class ProdromoiApi {
    
    attendance: AttendanceApi;

    constructor() {
        this.attendance = new AttendanceApi(null, env.PUBLIC_API_HOST);
    }

}