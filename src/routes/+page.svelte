<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { member } from "$lib/model/member";
    import { storedMember } from "$lib/stores";
    import { onMount } from "svelte";

    let currentMember: member = new member();

    let memberSaved: boolean = false;

    function start() {
        console.log(currentMember)
        storedMember.set(currentMember);
        //goto("/readQrCode");
        goto("/recordAttendance")
    }

    function readQR() {
        goto("/readQrCode");
    }

    function changeDetails() {
        memberSaved = false;
        localStorage.removeItem("storedMember")
    }

    function saveDetails() {
        storedMember.set(currentMember);
        memberSaved = true;
    }

    page.subscribe( (value) => {
        console.log(value.params['test'])
    })


    storedMember.subscribe((member) => {
        currentMember = member;
    });

    onMount(() => {
        var value: string | null =  localStorage.getItem("storedMember");
        console.log(value)
        if (value === null || value === 'null') {
            return;
        }
        storedMember.set(JSON.parse(value!) as member);
        memberSaved = true;
    })


</script>

<div class="grid h-1/5 place-items-center"/>
<div class="grid h-2/5 place-items-center">
    {#if !memberSaved}
        <div>
            <div class="form-control mb-3">
                <input 
                    type="text" 
                    placeholder="Name (first and last)" 
                    class="input input-bordered input-secondary" 
                    bind:value={currentMember.name}/>
            </div>
            <div class="form-control mb-3">
                <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    class="input input-bordered input-secondary" 
                    bind:value={currentMember.phoneNo}/>
            </div>
        </div>
    {:else}
        <div>
            <h1 class="text-4xl text-primary-content">Welcome back</h1>
            <br>
            <h1 class="text-4xl text-primary-content">{currentMember.name}</h1>
        </div>
    {/if}
</div>
<div class="grid h-1/5 place-items-center">
    {#if !memberSaved}
        <div>
            <button class="btn btn-info" on:click={saveDetails}>Save</button> 
        </div>
    {:else}
        <div>
            <button class="btn btn-accent" on:click={readQR}>Scan In</button> 
        </div>
        <br>
        <div>
            <button class="btn btn-neutral" on:click={changeDetails}>Change Details</button> 
        </div>
    {/if}
</div>

<div class="grid h-1/5 place-items-center"/>