<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { member } from "$lib/model/member";
    import { storedMember, hasStoredMember } from "$lib/stores";
    import { onMount } from "svelte";

    let currentMember: member = new member();

    let memberSaved: boolean = false;

    let loading:  boolean = true;

    function readQR() {
        goto("/readQrCode");
    }

    function changeDetails() {
        hasStoredMember.set(false)
        localStorage.removeItem("storedMember")
    }

    function saveDetails() {
        storedMember.set(currentMember);
        hasStoredMember.set(true);
    }

    storedMember.subscribe((member) => {
        currentMember = member;
    });

    hasStoredMember.subscribe((result) => {
        memberSaved = result;
        loading = false;
    });

</script>

{#if !loading}
<div class="grid h-1/5 place-items-center"/>
<div class="grid h-2/5 place-items-center">
    {#if !memberSaved}
        <div class="grid place-items-center">
            <h1 class="text-xl text-neutral bg-neutral-content/90 p-1 rounded">Welcome to Scouts Tasmania</h1>
            <h1 class="text-xl text-neutral bg-neutral-content/90 p-1 rounded">Attendance Recorder</h1>
            <hr class="mb-2">
            <h1 class="text-xl text-neutral bg-neutral-content/90 p-1 rounded">First we need to know a little about you</h1>
            <hr class="mb-6">
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
                    bind:value={currentMember.phoneNumber}/>
            </div>
        </div>
    {:else}
        <div class="grid place-items-center">
            <h1 class="text-4xl text-neutral bg-neutral-content/90 p-1 rounded">Welcome back</h1>
            <br class="m-2">
            <h1 class="text-2xl text-neutral bg-neutral-content/90 p-1 rounded">{currentMember.name}</h1>
        </div>
    {/if}
</div>
<div class="grid h-1/5 place-items-center">
    <div class="grid place-items-center">
        {#if !memberSaved}
            <div>
                <button class="btn btn-neutral" on:click={saveDetails}>Save to my phone</button> 
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