import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

import { AdminService } from './admin.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // 1️⃣ Create College
  @Post('colleges')
  @ApiOperation({ summary: 'Create a college' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'IIT Bombay' },
      },
      required: ['name'],
    },
  })
  @ApiResponse({ status: 201, description: 'College created successfully' })
  createCollege(@Body() body: { name: string }) {
    return this.adminService.createCollege(body.name);
  }

  // 2️⃣ Create Course under a College
  @Post('courses')
  @ApiOperation({ summary: 'Create a course under a college' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'CS101' },
        collegeId: { type: 'number', example: 1 },
      },
      required: ['name', 'collegeId'],
    },
  })
  @ApiResponse({ status: 201, description: 'Course created successfully' })
  createCourse(
    @Body() body: { name: string; collegeId: number },
  ) {
    return this.adminService.createCourse(body.name, body.collegeId);
  }

  // 3️⃣ Create Timetable slot for a Course
  @Post('timetables')
  @ApiOperation({ summary: 'Create timetable slot for a course' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        courseId: { type: 'number', example: 1 },
        day: { type: 'string', example: 'MON' },
        startTime: { type: 'string', example: '11:30' },
        endTime: { type: 'string', example: '12:30' },
      },
      required: ['courseId', 'day', 'startTime', 'endTime'],
    },
  })
  @ApiResponse({ status: 201, description: 'Timetable created successfully' })
  createTimetable(
    @Body()
    body: {
      courseId: number;
      day: string;
      startTime: string;
      endTime: string;
    },
  ) {
    return this.adminService.createTimetable(
      body.courseId,
      body.day,
      body.startTime,
      body.endTime,
    );
  }
}
