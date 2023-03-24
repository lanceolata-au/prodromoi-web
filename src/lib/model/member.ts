import { memberType } from "./memberType";

export class member {
    
    id: number = 0;
    registrationNumber: number | null = null;
    name: string = "";
    dateOfBirth: Date | null = null;
    memberType: memberType = memberType.unknown;
    phoneNo: string | null = null;
    email: string | null = null;

}