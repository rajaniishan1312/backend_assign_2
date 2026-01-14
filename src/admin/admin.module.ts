import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

import { College } from '../college.entity';
import { Course } from '../course.entity';
import { Timetable } from '../timetable.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([College, Course, Timetable]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
