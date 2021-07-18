import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 255, nullable: false})
    name: string;

    @Column({type: "varchar", length: 255, nullable: false})
    color: string;
    
    @Column({type: "int"})
    volunteer_id: number;

    @Column({type: "text", length: 500, nullable: false})
    location_found: Text;

    @Column({type: "text", nullable: false})
    image_url: Text;

    @Column({type: "timestamp without time zone", nullable: false})
    createAt: Timestamp;

    @Column({type: "timestamp without time zone", nullable: false})
    updateAt: Timestamp;

}