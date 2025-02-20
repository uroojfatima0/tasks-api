import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index') // Render the "index.ejs" file
  home() {
    return { message: 'Welcome to the Task Manager' };
  }
}