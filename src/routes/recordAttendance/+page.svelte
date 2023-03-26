<script lang="ts">
    import { goto } from "$app/navigation";
    import { member } from "$lib/model/member";
    import { memberAttendance } from "$lib/model/memberAttendance";
    import { storedMember } from "$lib/stores";
    import Attendance from "$lib/widgets/attendance.svelte";

    let currentMember: member = new member();

    let attendances: memberAttendance[] = [new memberAttendance()];

    storedMember.subscribe((member) => {
        currentMember = member;
    });

    function addAttendances() {
        attendances.push(new memberAttendance())
    }

    function cancel() {
        goto("/")
    }

</script>

<div class="grid h-3/4 place-items-center">
    {#each attendances as attendance}
        <Attendance/>
    {/each}

    <button class="btn btn-error" on:click={addAttendances}>Add</button>
</div>





{currentMember.name}



<div class="grid h-1/4 place-items-center">
    <div>
        <button class="btn btn-error" on:click={cancel}>Cancel</button>
    </div>
</div>