<script lang="ts">
    import { goto } from '$app/navigation';
    import type { FormationApi } from '$lib/api/FormationApi';
    import { ProdromoiApi } from '$lib/prodromoiApi';
    import type { ApiResult } from "$lib/api/ApiResult";

    // https://dev.to/myleftshoe/simple-qrbarcode-scanning-with-svelte-and-html5qrcode-1d59
    import { Html5Qrcode } from 'html5-qrcode';
    import type { Html5QrcodeResult, QrcodeSuccessCallback } from 'html5-qrcode/esm/core';
    import type { Result } from 'postcss';
    import { onMount, onDestroy } from 'svelte';
    import { checkinFormationSection } from '$lib/stores';
    import type { formationSection } from '$lib/model/formationSection';

    let prodromoiApi: ProdromoiApi = new ProdromoiApi();
    let scanning: boolean = false;
    let html5Qrcode: Html5Qrcode;
    let manualCode: string = "";
    let formationApi: FormationApi = prodromoiApi.formation;

    onMount(() => {
        html5Qrcode = new Html5Qrcode('reader');
        start();
    });

    onDestroy(() => {
        stop();
    })

    function start() {
        html5Qrcode.start(
            { facingMode: 'environment' },
            {
                fps: 20,
                qrbox: { width: 300, height: 300 },
            },
            onScanSuccess,
            onScanFailure
        )
        scanning = true
    }

    async function stop() {
        if (html5Qrcode !== null) {
            await html5Qrcode?.stop()
        }
        scanning = false
    }

    function onScanSuccess(decodedText: string, decodedResult: Html5QrcodeResult) {
        alert(`Code matched = ${decodedText}`)
        console.log(decodedResult)
    }

    function onScanFailure(error: any) {
    }

    function getFromFriendlyCode() {
        formationApi.getFromFriendlyCode("test")
    }

    formationApi.result.subscribe((result: ApiResult) => {

        if (result.resultCode === 200) {
            goto(`/recordAttendance/${(result.resultBody as formationSection).hashId}`)
        }

    });

    function startRecording() {
        goto("/recordAttendance")
    }

    function cancel() {
        goto("/")
    }

</script>

<div class="grid h-3/5 place-items-center">
    <reader class="w-3/4 aspect-square bg-neutral flex rounded-md" id="reader"/>
</div>
<div class="grid h-1/5 place-items-center">
    <div class="grid place-items-center">
        <div class="form-control mb-3">
            <input 
                type="text" 
                placeholder="Manual Code" 
                class="input input-bordered input-secondary" 
                bind:value={manualCode}/>
        </div>
        <div>
            <button class="btn btn-accent" on:click={getFromFriendlyCode}>Submit Manual Code</button>
        </div>
    </div>
</div>
<div class="grid h-1/5 place-items-center">
    <div>
        <button class="btn btn-error" on:click={cancel}>Cancel</button>
    </div>
</div>


<style>
    reader {
        max-width: 300px;
    }
</style>