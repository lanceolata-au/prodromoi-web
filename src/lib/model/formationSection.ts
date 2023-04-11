import { formation } from "./formation";
import { sectionType } from "./sectionType";

export class formationSection {
    public hashId: string = "";
    public formation: formation = new formation();
    public sectionType: sectionType = sectionType.Undefined;
}