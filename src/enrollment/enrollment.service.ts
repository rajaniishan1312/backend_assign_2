import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Enrollment } from './enrollment.entity';
import { Student } from '../student.entity';
import { Course } from '../course.entity';

const DAY_INDEX: Record<string, number> = {
  MON: 0,
  TUE: 1,
  WED: 2,
  THU: 3,
  FRI: 4,
  SAT: 5,
  SUN: 6,
};

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function toRanges(slot: any): [number, number][] {
  const dayStart = DAY_INDEX[slot.day] * 1440;
  const start = dayStart + timeToMinutes(slot.startTime);
  const end = dayStart + timeToMinutes(slot.endTime);

  // Same-day slot
  if (end > start) {
    return [[start, end]];
  }

  // Cross-midnight slot
  return [
    [start, dayStart + 1440],
    [dayStart + 1440, dayStart + 1440 + timeToMinutes(slot.endTime)],
  ];
}

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,

    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,

    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async enrollStudent(studentId: number, courseId: number) {
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
      relations: {
        enrollments: {
          course: {
            timetables: true,
          },
        },
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: {
        timetables: true,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const existingTimetables = student.enrollments.flatMap(
      enrollment => enrollment.course.timetables,
    );

    const newCourseTimetables = course.timetables;

    if (this.hasTimetableClash(existingTimetables, newCourseTimetables)) {
      throw new ConflictException('Timetable clash detected');
    }

    const enrollment = new Enrollment();
    enrollment.student = student;
    enrollment.course = course;

    return this.enrollmentRepository.save(enrollment);
  }

  private hasTimetableClash(
    existingTimetables: any[],
    newTimetables: any[],
  ): boolean {
    const existingRanges = existingTimetables.flatMap(toRanges);
    const incomingRanges = newTimetables.flatMap(toRanges);

    for (const [s1, e1] of existingRanges) {
      for (const [s2, e2] of incomingRanges) {
        if (s2 < e1 && e2 > s1) {
          return true;
        }
      }
    }
    return false;
  }
}




