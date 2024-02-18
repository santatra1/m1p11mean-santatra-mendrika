import { Service } from "./service";
export interface Employee {
    _id: string,
    matricule: number,
    firstName: string,
    lastName: string,
    startTime: number,
    endTime: string,
    isTimeDefined: boolean,
    service: Service,
    user:string,
}
