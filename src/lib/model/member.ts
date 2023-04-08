import { memberType } from "./memberType";

export class member {
    
    public name: string = "";
    public registrationNumber: number = -1;
    public dateOfBirth: Date = new Date("01-01-1900");
    public memberType: memberType = memberType.unknown;
    public phoneNumber: string = "";
    public email: string = "";

}