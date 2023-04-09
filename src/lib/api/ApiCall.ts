import { ApiResult } from "./ApiResult";
import { apiLoading } from "../stores";
import type { Writable } from "svelte/store";

export class ApiCall {

    readonly _bearerToken: string| null;
    readonly _httpHost: string;
    readonly _result: Writable<ApiResult>;
    _headers = {};
    
    constructor(
        bearerToken: string | null = null, 
        httpHost: string,
        result: Writable<ApiResult>) {
        
        this._bearerToken = bearerToken
        this._httpHost = httpHost;
        this._result = result;

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

    getEndpoint(endpoint: string) {
        
        apiLoading.set(true);

        let requestOptions = {
            headers: new Headers(this._headers)
        }

        let apiResult: ApiResult = new ApiResult();

        let fullEndpoint = "https://" + this._httpHost + "/" + endpoint

        fetch(fullEndpoint, requestOptions).then((httpResult) => {
            apiResult.resultCode = httpResult.status;
            apiResult.resultHeaders = httpResult.headers;

            if (apiResult.resultCode == 200) {
                
                httpResult.json().then(data => {
                    apiResult.resultBody = data;
                });              
            }

            this._result.set(apiResult)
            apiLoading.set(false);

        });

    }

    postEndpoint(endpoint: string, body: any) {
        
        apiLoading.set(true);

        let requestOptions = {
            method: 'POST',
            headers: new Headers(this._headers),
            body: JSON.stringify(body)
        }

        let apiResult: ApiResult = new ApiResult();

        let fullEndpoint = "https://" + this._httpHost + "/" + endpoint

        fetch(fullEndpoint, requestOptions).then((httpResult) => {
            apiResult.resultCode = httpResult.status;
            apiResult.resultHeaders = httpResult.headers;

            if (apiResult.resultCode == 200) {
                
                httpResult.json().then(data => {
                    apiResult.resultBody = data;
                });              
            }
            
            this._result.set(apiResult)
            apiLoading.set(false);

        });
    }


    // sleep time expects milliseconds
    private sleep(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

}