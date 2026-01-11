import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { EnrollmentService } from './enrollment.service';

@ApiTags('Enrollments')
@Controller('enrollments')
export class EnrollmentController {
  constructor(
    private readonly enrollmentService: EnrollmentService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Enroll a student into a course' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        studentId: { type: 'number', example: 1 },
        courseId: { type: 'number', example: 1 },
      },
      required: ['studentId', 'courseId'],
    },
  })
  @ApiResponse({ status: 201, description: 'Enrollment created successfully' })
  @ApiResponse({ status: 404, description: 'Student or Course not found' })
  enroll(
    @Body() body: { studentId: number; courseId: number },
  ) {
    return this.enrollmentService.enrollStudent(
      body.studentId,
      body.courseId,
    );
  }
}
