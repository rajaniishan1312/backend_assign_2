import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { Student } from './student.entity';
import { Course } from './course.entity';

@Entity()
@Unique(['name'])
export class College {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Student, student => student.college)
  students: Student[];

  @OneToMany(() => Course, course => course.college)
  courses: Course[];
}
