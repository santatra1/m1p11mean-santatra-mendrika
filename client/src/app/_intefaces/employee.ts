import { ICredential } from "./icredential";
import { Service } from "./service";
export interface Employee {
    _id: string,
    matricule: number,
    firstName: string,
    lastName: string,
    startTime: string,
    endTime: string,
    isTimeDefine: boolean,
    service: Service,
    user:ICredential,
}
