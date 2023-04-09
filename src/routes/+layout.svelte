<script lang="ts">
    import "../app.css";
    import { onMount } from 'svelte';
    import { storedMember, hasStoredMember, apiLoading } from "$lib/stores";
    import type { member } from "$lib/model/member";

    import Loading from "$lib/widgets/loading.svelte";

    onMount(() => {
        
        storedMember.subscribe((member) => {
            console.log(member)
            if (member.name == "") return;
            localStorage.setItem("storedMember", JSON.stringify(member))
        });

        var value = localStorage.getItem("storedMember");
        if (value === null || value === 'null') {
            hasStoredMember.set(false)
            return;
        }
        
        storedMember.set(JSON.parse(value) as member);
        hasStoredMember.set(true)

        apiLoading.set(false)
    })



</script>

{#if $apiLoading}
    <Loading/>
{/if}

<slot />
<div class="absolute top-0 left-0 w-2/3 w-full bg-transparent -z-50">
    <img src="bg/tl.png"/>
</div>
<div class="absolute bottom-0 right-0 w-2/3 bg-transparent -z-50">
    <img src="bg/br.png"/>
</div>