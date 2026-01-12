import { StaffDesignation } from "../enum/StaffDesignation";

export interface Staff {
    name: string,
    experience: number,
    designation: StaffDesignation,
    title: string,
    id: string
}