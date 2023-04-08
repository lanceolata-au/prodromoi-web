import { member } from "./member";
import type { memberAttendance } from "./memberAttendance";

export class quickAttendance {
    recordingAdult: member = new member();
    attendances: memberAttendance[] = [];
}