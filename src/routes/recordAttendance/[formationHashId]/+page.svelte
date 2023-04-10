<script lang="ts">
    import { goto } from "$app/navigation";
    import { ApiResult } from "$lib/api/ApiResult";
    import type { AttendanceApi } from "$lib/api/AttendanceApi";
    import type { FormationApi } from "$lib/api/FormationApi.js";
    import { formationSection } from "$lib/model/formationSection";
    import { member } from "$lib/model/member";
    import { memberAttendance } from "$lib/model/memberAttendance";
    import { quickAttendance } from "$lib/model/quickAttendance";
    import  { ProdromoiApi } from "$lib/prodromoiApi";
    import { storedMember, apiLoading, checkinFormationSection } from "$lib/stores";
    import { onMount } from "svelte";
    export let data;

    var api: ProdromoiApi = new ProdromoiApi();
    var attendanceApi: AttendanceApi = api.attendance
    var formationApi: FormationApi = api.formation;
    let currentMember: member = new member();
    let formationCheckin: formationSection = new formationSection();
    let attendances: memberAttendance[] = [];
    let allChecked: boolean = true;
    
    

    onMount(() => {
        clearAttendances();
        formationApi.getFromHashId(data.formationHashId);
    });

    const sleep = (ms: number) => new Promise(f => setTimeout(f, ms));

    storedMember.subscribe((member) => {
        currentMember = member;
    });

    formationApi.result.subscribe((result: ApiResult) => {

        if (result.resultCode === 200) {
            formationCheckin = result.resultBody as formationSection;
        }

    });

    function addAttendances() {
        var attendance = new memberAttendance();
        attendance.present = true;
        attendances= [...attendances, attendance];
    }

    function clearAttendances() {
        var attendance = new memberAttendance();
        attendance.present = false;
        attendances= [attendance];
    }

    function cancel() {
        goto("/")
    }

    function submit() {
        apiLoading.set(true)
        let attendance: quickAttendance = new quickAttendance();
        attendance.recordingAdult = currentMember;
        attendance.attendances = attendances;

        attendanceApi.postQuickAttendance(attendance, formationCheckin);
    }

    attendanceApi.result.subscribe((result: ApiResult) => {

        if (result.resultCode === 200) {
            //goto("/confirmAttendance")
        }

        if (result.resultCode !== 0 ) {
            attendanceApi.result.set(new ApiResult())
        }
    })

    let listview: Element;

    const scrollToBottom = async (node: Element) => {
        await sleep(10);
        node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
    }; 

    $: if(listview && attendances) {
        scrollToBottom(listview);
    }

</script>

<div bind:this={listview} class="overflow-y-scroll h-[80%] mt-3">
    {#if formationCheckin.formation && formationCheckin.sectionType}
        <h1 class="text-lg">{formationCheckin.formation.name} | {formationCheckin.sectionType.toString}</h1>
    {/if}
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
                            <input 
                                type="text" 
                                placeholder="Type here" 
                                class="input input-bordered input-md w-full max-w-xs" 
                                bind:value="{attendance.member.name}"/>
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
<div class="h-[20%] w-full grid grid-cols-2 gap-1 pb-4 pl-1 pr-1 bg-base-200/80">
    <div class="grid place-items-center">
        <button class="btn btn-warning" on:click={clearAttendances}>Clear</button>
    </div>
    <div class="grid place-items-center">
        <button class="btn btn-accent" on:click={addAttendances}>Add</button>
    </div>
    <div class="grid place-items-center">
        <button class="btn btn-error" on:click={cancel}>Cancel</button>
    </div>

    <div class="grid place-items-center">
        <button class="btn btn-primary" on:click={submit}>Submit</button>
    </div>
</div>


