<script lang="ts">
    import { goto } from "$app/navigation";
    import { member } from "$lib/model/member";
    import { storedMember } from "$lib/stores";
    import { onMount } from "svelte";

    function start() {
        console.log(currentMember)
        storedMember.set(currentMember);
        //goto("/readQrCode");
        goto("/recordAttendance")
    }

    function readQR() {
        console.log(currentMember)
        storedMember.set(currentMember);
        goto("/readQrCode");
    }

    let currentMember: member = new member();

    storedMember.subscribe((member) => {
        currentMember = member;
    });

    onMount(() => {
        var value: string | null =  localStorage.getItem("storedMember");
        console.log(value)
        if (value === null || value === 'null') return;
        storedMember.set(JSON.parse(value!) as member);
    })

</script>

<div class="grid h-2/5 place-items-center"/>
<div class="grid h-1/5 place-items-center">
    <div class="form-control mb-3">
        <input 
        type="text" 
        placeholder="Name (first and last)" 
        class="input input-bordered input-secondary" 
        bind:value={currentMember.name}/>
    </div>
    {currentMember.name}
    <div>
        <button class="btn btn-info" on:click={start}>Start</button>
    </div>
    <div>
        <button class="btn btn-info" on:click={readQR}>ReadQR</button>
    </div>
</div>
<div class="grid h-2/5 place-items-center"/>