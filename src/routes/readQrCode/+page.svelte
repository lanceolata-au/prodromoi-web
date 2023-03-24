<script lang="ts">
    import { goto } from '$app/navigation';
    
    // https://dev.to/myleftshoe/simple-qrbarcode-scanning-with-svelte-and-html5qrcode-1d59
    import { Html5Qrcode } from 'html5-qrcode';
    import type { Html5QrcodeResult, QrcodeSuccessCallback } from 'html5-qrcode/esm/core';
    import type { Result } from 'postcss';
    import { onMount } from 'svelte';

    let scanning: boolean = false;
    let html5Qrcode: Html5Qrcode;

    onMount( () => {
        html5Qrcode = new Html5Qrcode('reader');
        start();
    });

    function start() {
        html5Qrcode.start(
            { facingMode: 'environment' },
            {
                fps: 20,
                qrbox: { width: 250, height: 250 },
            },
            onScanSuccess,
            onScanFailure
        )
        scanning = true
    }

    async function stop() {
        await html5Qrcode.stop()
        scanning = false
    }

    function onScanSuccess(decodedText: string, decodedResult: Html5QrcodeResult) {
        alert(`Code matched = ${decodedText}`)
        console.log(decodedResult)
    }

    function onScanFailure(error: any) {
    }

    function cancel() {
        goto("/")
    }

</script>

<div class="grid h-3/4 place-items-center">
    <reader class="w-3/4 aspect-square bg-neutral flex rounded-md" id="reader"/>
</div>
<div class="grid h-1/4 place-items-center">
    <div>
        <button class="btn btn-error" on:click={cancel}>Cancel</button>
    </div>
</div>