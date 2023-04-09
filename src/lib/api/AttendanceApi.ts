import { ApiCall } from "./ApiCall";
import type { quickAttendance } from "$lib/model/quickAttendance";

export class AttendanceApi {

    private _apiCall: ApiCall;

    constructor(bearerToken: string | null, httpHost: string) {
        this._apiCall = new ApiCall(bearerToken, httpHost)
    }
    
    async postQuickAttendance(quickAttendance: quickAttendance) {
        let result = await this._apiCall.postEndpoint("attendance/new", quickAttendance);
    }

}