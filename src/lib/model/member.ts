import { memberType } from "./memberType";

export class member {
    
    public id: number = 0;
    public registrationNumber: number | null = null;
    public name: string = "";
    public dateOfBirth: Date | null = null;
    public memberType: memberType = memberType.unknown;
    public phoneNo: string | null = null;
    public email: string | null = null;

}