<script lang="ts">
    import { goto } from "$app/navigation";
    import { member } from "$lib/model/member";
    import { storedMember } from "$lib/stores";

    let currentMember: member = new member();

    storedMember.subscribe((member) => {
        currentMember = member;
    });

    function cancel() {
        goto("/")
    }

</script>


{currentMember.name}

<div class="grid h-1/4 place-items-center">
    <div>
        <button class="btn btn-error" on:click={cancel}>Cancel</button>
    </div>
</div>