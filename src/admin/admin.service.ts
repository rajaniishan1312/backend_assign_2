import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { College } from '../college.entity';
import { Course } from '../course.entity';
import { Timetable } from '../timetable.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(College)
    private readonly collegeRepository: Repository<College>,

    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Timetable)
    private readonly timetableRepository: Repository<Timetable>,
  ) {}

  // 1️⃣ Create College
  createCollege(name: string) {
    const college = this.collegeRepository.create({ name });
    return this.collegeRepository.save(college);
  }

  // 2️⃣ Create Course under a College
  async createCourse(name: string, collegeId: number) {
    const college = await this.collegeRepository.findOneBy({ id: collegeId });

    if (!college) {
      throw new NotFoundException('College not found');
    }

    const course = this.courseRepository.create({
      name,
      college,
    });

    return this.courseRepository.save(course);
  }

  // 3️⃣ Create Timetable slot for a Course
  async createTimetable(
    courseId: number,
    day: string,
    startTime: string,
    endTime: string,
  ) {
    const course = await this.courseRepository.findOneBy({ id: courseId });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const timetable = this.timetableRepository.create({
      day,
      startTime,
      endTime,
      course,
    });

    return this.timetableRepository.save(timetable);
  }
}
