<script lang="ts">
    import { goto } from "$app/navigation";

    function start() {
        goto("/readQrCode")
    }

</script>
<div class="grid h-full place-items-center">
    <div>
        <button class="btn btn-info" on:click={start}>Start</button>
    </div>
</div>