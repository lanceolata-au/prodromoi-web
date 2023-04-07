import { ApiResult } from "./ApiResult";

import { writable, type Writable } from 'svelte/store';

export class ApiCall {

    readonly _bearerToken: string| null;
    readonly _httpHost: string;
    _headers = {};

    // TODO make this work correctly. 
    // This may need to go into a store of some kind
    public isApiCallLoading = writable(true);
    
    constructor(bearerToken: string | null = null, httpHost: string) {
        
        this._bearerToken = bearerToken
        
        this._httpHost = httpHost;

        if (this._bearerToken != null) {
            this._headers = {
                'User-Agent' : 'Wodan.Web',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Authorization' : 'Bearer ' + this._bearerToken
            }
        } else {
            this._headers = {
                'User-Agent' : 'Wodan.Web',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        }


    }

    async getEndpoint<T extends ApiResult>(endpoint: string) {
        
        this.isApiCallLoading.set(true);

        let requestOptions = {
            headers: new Headers(this._headers)
        }

        let apiResult: ApiResult = new ApiResult();

        let fullEndpoint = "https://" + this._httpHost + "/" + endpoint

        let rawResult = await fetch(fullEndpoint, requestOptions)

        apiResult.resultCode = rawResult.status;
        apiResult.resultHeaders = rawResult.headers;

        if (apiResult.resultCode == 200) {
            await rawResult.json().then(data => {
                apiResult.resultBody = data as T;
            }); 
        }

        this.isApiCallLoading.set(false);

        return apiResult;

    }

}