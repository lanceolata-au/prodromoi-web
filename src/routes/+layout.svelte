<script>
    import "../app.css";
    import { onMount } from 'svelte';
    import { storedMember } from "$lib/stores";

    onMount(() => {
        console.log(localStorage.getItem("storedMember"))
        storedMember.subscribe((member) => {
            localStorage.setItem("storedMember", JSON.stringify(member))
        });
    })
</script>

<slot />