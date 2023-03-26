<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { member } from "$lib/model/member";
    import { storedMember } from "$lib/stores";
    import { onMount } from "svelte";

    let currentMember: member = new member();

    let memberSaved: boolean = false;

    let loading:  boolean = true;

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
            loading = false;
            return;
        }
        storedMember.set(JSON.parse(value!) as member);
        memberSaved = true;
        loading = false;
    })


</script>

{#if !loading}
<div class="grid h-1/5 place-items-center"/>
<div class="grid h-2/5 place-items-center">
    {#if !memberSaved}
        <div class="grid place-items-center">
            <h1 class="text-xl text-primary-content">Welcome to Scouts Tasmania</h1>
            <h1 class="text-xl text-primary-content">Attendance Recorder</h1>
            <hr class="mb-10">
            <h1 class="text-xl text-primary-content">First we need to know a little about you</h1>
            <hr class="mb-10">
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
        <div class="grid place-items-center">
            <h1 class="text-4xl text-primary-content">Welcome back</h1>
            <br>
            <h1 class="text-4xl text-primary-content">{currentMember.name}</h1>
        </div>
    {/if}
</div>
<div class="grid h-1/5 place-items-center">
    <div class="grid place-items-center">
        {#if !memberSaved}
            <div>
                <button class="btn btn-info" on:click={saveDetails}>Save to my phone</button> 
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
</div>

<div class="grid h-1/5 place-items-center"/>
{/if}