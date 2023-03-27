<script lang="ts">
    import { goto } from "$app/navigation";
    import { member } from "$lib/model/member";
    import { memberAttendance } from "$lib/model/memberAttendance";
    import { storedMember } from "$lib/stores";
    import Attendance from "$lib/widgets/attendance.svelte";
    import { onMount } from "svelte";

    let currentMember: member = new member();

    let attendances: memberAttendance[] = [new memberAttendance()];

    let allChecked: boolean = false;

    storedMember.subscribe((member) => {
        currentMember = member;
    });

    function addAttendances() {
        var attendance = new memberAttendance();
        attendances= [...attendances, attendance];
    }

    function cancel() {
        goto("/")
    }

    storedMember.subscribe(member => {
        currentMember = member;
    })

</script>

<div class="overflow-x-auto w-full">
    <table class="table w-full">
    <!-- head -->
    <thead>
        <tr>
            <th>Full Name</th>
            <th>            
                <label>
                <input type="checkbox" class="checkbox" />
                </label>
            </th>
        </tr>
    </thead>
    <tbody>
        <!-- row 1 -->
        <tr>
            <td>
                <div class="flex items-center space-x-3">
                    <div class="w-full">
                        <div class="font-bold pl-2 pr-2">{currentMember.name}</div>
                    </div>
                </div>
            </td>
            <th>
                <label>
                    <input type="checkbox" class="checkbox" disabled checked/>
                </label>
            </th>
        </tr>
        {#each attendances as attendance}
        <tr>
            <td>
                <div class="flex items-center space-x-3">
                    <div class="w-full">
                        <input type="text" placeholder="Type here" class="input input-bordered input-md w-full max-w-xs" />
                    </div>
                </div>
            </td>
            <th>
                <label>
                    <input type="checkbox" class="checkbox" />
                </label>
            </th>
        </tr>
        {/each}
        <tr>
            <td colspan="2" >
                <div class="grid place-items-center">
                    <button class="btn btn-sm btn-secondary" on:click={addAttendances}>Add</button>
                </div>
            </td>
        </tr>
    </table>
</div>
