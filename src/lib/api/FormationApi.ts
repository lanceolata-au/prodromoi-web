import { ApiCall } from "./ApiCall";
import { ApiResult } from "./ApiResult";
import { writable, type Writable } from 'svelte/store';

export class FormationApi {

    private _apiCall: ApiCall;

    result: Writable<ApiResult>;

    constructor(bearerToken: string | null, httpHost: string) {
        this.result = writable(new ApiResult());
        this._apiCall = new ApiCall(bearerToken, httpHost, this.result);
    }

    getFromFriendlyCode(code: string) {
        this._apiCall.getEndpoint(`formation/${code}/friendlycode`)
    }

    getFromHashId(hashId: string) {
        this._apiCall.getEndpoint(`formation/${hashId}/id`)
    }

}