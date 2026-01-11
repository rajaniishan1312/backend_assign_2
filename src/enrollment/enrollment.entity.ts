import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { Student } from '../student.entity';
import { Course } from '../course.entity';

@Entity()
@Unique(['student', 'course'])
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student)
  student: Student;

  @ManyToOne(() => Course)
  course: Course;
}
