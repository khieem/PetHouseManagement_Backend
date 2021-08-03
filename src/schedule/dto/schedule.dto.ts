import { User } from "src/entity/user.entity"

export class ScheduleDto {
    shift?: string;
    date?: string;
    user?: User;
}