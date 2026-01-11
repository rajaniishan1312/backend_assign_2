import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Course } from './course.entity';

@Entity()
export class Timetable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: string; // e.g. MON, TUE, WED

  @Column({ type: 'time' })
  startTime: string; // '10:00'

  @Column({ type: 'time' })
  endTime: string; // '11:30'

  @ManyToOne(() => Course, course => course.timetables)
  course: Course;
}
