import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { College } from './college.entity';
import { Timetable } from './timetable.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => College)
  college: College;

  @OneToMany(() => Timetable, timetable => timetable.course)
  timetables: Timetable[];
}
