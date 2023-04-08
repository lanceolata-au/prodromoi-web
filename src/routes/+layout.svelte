<script lang="ts">
    import "../app.css";
    import { onMount } from 'svelte';
    import { storedMember, hasStoredMember, apiLoading } from "$lib/stores";
    import type { member } from "$lib/model/member";

    import Loading from "$lib/widgets/loading.svelte";

    onMount(() => {
        
        var value = localStorage.getItem("storedMember");
        if (value === null || value === 'null') {
            hasStoredMember.set(false)
            return;
        }
        
        storedMember.set(JSON.parse(value) as member);
        hasStoredMember.set(true)
    
        storedMember.subscribe((member) => {
            localStorage.setItem("storedMember", JSON.stringify(member))
        });

        apiLoading.set(false)
    })



</script>

{#if $apiLoading}
    <Loading/>
{/if}
<slot />