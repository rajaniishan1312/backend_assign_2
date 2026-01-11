import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Enrollment } from './enrollment.entity';
import { EnrollmentService } from './enrollment.service';
import { Student } from '../student.entity';
import { Course } from '../course.entity';
import { EnrollmentController } from './enrollment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enrollment, Student, Course]),
  ],
  providers: [EnrollmentService],
  exports: [EnrollmentService],
  controllers: [EnrollmentController],
})
export class EnrollmentModule {}
