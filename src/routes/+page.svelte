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

    let currentMember: member = new member();

    storedMember.subscribe((member) => {
        currentMember = member;
    });

    onMount(() => {
        storedMember.set(JSON.parse(localStorage.getItem("storedMember")!) as member)
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
</div>
<div class="grid h-2/5 place-items-center"/>