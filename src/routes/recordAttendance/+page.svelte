<script lang="ts">
    import { goto } from "$app/navigation";
    import { member } from "$lib/model/member";
    import { memberAttendance } from "$lib/model/memberAttendance";
    import { storedMember } from "$lib/stores";
    import Attendance from "$lib/widgets/attendance.svelte";
    import { onMount } from "svelte";

    let currentMember: member = new member();

    let attendances: memberAttendance[] = [];

    let allChecked: boolean = true;

    const sleep = (ms: number) => new Promise(f => setTimeout(f, ms));

    storedMember.subscribe((member) => {
        currentMember = member;
    });

    function addAttendances() {
        var attendance = new memberAttendance();
        attendance.present = true;
        attendances= [...attendances, attendance];
    }

    function clearAttendances() {
        var attendance = new memberAttendance();
        attendance.present = true;
        attendances= [attendance];
    }

    function cancel() {
        goto("/")
    }

    storedMember.subscribe(member => {
        currentMember = member;
    })

    onMount(() => {
        addAttendances();
    });

    let listview: Element;

    const scrollToBottom = async (node: Element) => {
        await sleep(10);
        node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
    }; 

    $: if(listview && attendances) {
        scrollToBottom(listview);
    }

    // $: allChecked, attendances.forEach(attendance => {
    //         attendance.present = false;
    //         console.log(attendances)
    //     }), attendances = attendances;

</script>

<div bind:this={listview} class="overflow-y-scroll h-[90%] mt-3">
    <table class="table w-full">
        <!-- head -->
        <thead>
            <tr>
                <th>Full Name</th>
                <th>            
                    <label>
                    <input type="checkbox" class="checkbox" bind:checked={allChecked}/>
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
                            <div class="font-bold pl-1 pr-1">{currentMember.name}</div>
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
                        <input type="checkbox" class="checkbox" bind:checked={attendance.present}/>
                    </label>
                </th>
            </tr>
            {/each}
        </table>
</div>
<div class="h-[10%] w-full grid grid-cols-4 gap-1">
    <div class="grid place-items-center">
        <button class="btn btn-error" on:click={cancel}>Cancel</button>
    </div>
    <div class="grid place-items-center">
        <button class="btn btn-warning" on:click={clearAttendances}>Clear</button>
    </div>
    <div class="grid place-items-center">
        <button class="btn btn-primary" on:click={addAttendances}>Add</button>
    </div>
    <div class="grid place-items-center">
        <button class="btn btn-primary">Submit</button>
    </div>

</div>


