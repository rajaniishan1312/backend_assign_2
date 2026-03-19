// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

//import { Test } from './test.entity';
import { College } from './college.entity';
import { Student } from './student.entity';
import { Course } from './course.entity';
import { Enrollment } from './enrollment/enrollment.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentService } from './enrollment/enrollment.service';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { Timetable } from './timetable.entity';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'course_enrollment',
      entities: [College, Student, Course, Enrollment, Timetable],
      synchronize: true, // IMPORTANT: keep false for now
      logging: ['schema'],
    }),
    EnrollmentModule,
    AdminModule,
  ],
  // providers: [EnrollmentService],
})
export class AppModule {}
