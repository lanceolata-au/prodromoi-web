<script lang="ts">
    import { goto } from "$app/navigation";


function backToStart() {
    goto("/")
}

</script>

<div class="grid h-1/5 place-items-center"/>
<div class="grid h-2/5 place-items-center">
    <div class="grid place-items-center">
        <h1 class="text-4xl text-neutral bg-neutral-content/90 p-1 rounded">Successfully Scanned In!</h1>
    </div>
</div>
<div class="grid h-1/5 place-items-center">
    <div class="grid place-items-center">
            <div>
                <button class="btn btn-neutral" on:click={backToStart}>Scan Again</button> 
            </div>
    </div>
</div>

<div class="grid h-1/5 place-items-center"/>