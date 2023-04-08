import { memberType } from "./memberType";

export class member {
    
    public id: number = 0;
    public registrationNumber: number = -1;
    public name: string = "";
    public dateOfBirth: Date = new Date("01-01-1900");
    public memberType: memberType = memberType.unknown;
    public phoneNumber: string = "";
    public email: string = "";

}