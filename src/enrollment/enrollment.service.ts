import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Enrollment } from './enrollment.entity';
import { Student } from '../student.entity';
import { Course } from '../course.entity';

@Injectable()
export class EnrollmentService {
    constructor(
        @InjectRepository(Enrollment)
        private readonly enrollmentRepository: Repository<Enrollment>,

        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,

        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) { }

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
        for (const existing of existingTimetables) {
            for (const incoming of newTimetables) {
                if (
                    existing.day === incoming.day &&
                    incoming.startTime < existing.endTime &&
                    incoming.endTime > existing.startTime
                ) {
                    return true;
                }
            }
        }
        return false;
    }
}
