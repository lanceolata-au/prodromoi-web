import { ApiCall } from "./ApiCall";
import type { quickAttendance } from "$lib/model/quickAttendance";
import { ApiResult } from "./ApiResult";
import { writable, type Writable } from 'svelte/store';
import type { formationSection } from "$lib/model/formationSection";


export class AttendanceApi {

    private _apiCall: ApiCall;

    result: Writable<ApiResult>;

    constructor(bearerToken: string | null, httpHost: string) {
        this.result = writable(new ApiResult());
        this._apiCall = new ApiCall(bearerToken, httpHost, this.result);
    }
    
    postQuickAttendance(quickAttendance: quickAttendance, formationSection: formationSection) {
        this._apiCall.postEndpoint(`attendance/${formationSection.hashId}/new`, quickAttendance);
    }

}