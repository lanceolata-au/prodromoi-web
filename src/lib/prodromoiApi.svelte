<script context="module" lang="ts">
    import { env } from '$env/dynamic/public'
    import { writable, type Writable } from 'svelte/store';


    export const apiRoot: Writable<string | null> = writable(null);

    if (!env.PUBLIC_API_HOST) {
        apiRoot.set("localhost:7227")
    } else {
        apiRoot.set(env.PUBLIC_API_HOST);
    }



</script>