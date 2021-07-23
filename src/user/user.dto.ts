import { Appointment } from "src/entity/appointment.entity";
import { Donation } from "src/entity/donation.entity";
import { Pet } from "src/entity/pet.entity";
import { Report } from "src/entity/report.entity";
import { Schedule } from "src/entity/schedule.entity";
import { isString } from "util";

export  class UserDto {
    phone?: string;
    role?: string;
    name?: string;
    password?: string;
    collab?: boolean;
    gender?: string;
    address?: string;
    email?: string;
    donations? :Donation[];
    schedules?: Schedule[];
    reports?: Report[];
    appointments?: Appointment[];
    pet?: Pet;
    createAt?: Date;
    updateAt?: Date;
}