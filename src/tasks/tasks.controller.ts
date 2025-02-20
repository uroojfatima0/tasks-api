import { 
    Controller, Get, Post, Put, Delete, Param, Body, Render, Redirect, Req, Res 
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { ApiTags, ApiResponse, ApiOperation, ApiBody, ApiParam, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    // ✅ UI Route (Excluded from Swagger)
    @Get('create')
    @Render('task-create')
    @ApiExcludeEndpoint()
    createTaskForm() {
        return {};
    }

    // ✅ API Route - Create Task
    @Post('create')
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({ status: 201, description: 'Task created successfully' })
    @ApiBody({ schema: { properties: { title: { type: 'string' }, description: { type: 'string' } } } })
    async createTask(@Body() body) {
        return this.tasksService.createTask(body.title, body.description);
    }

    // ✅ API Route - Get All Tasks
    @Get()
    @ApiOperation({ summary: 'Fetch all tasks' })
    @ApiResponse({ status: 200, description: 'List of tasks', type: [Task] })
    async getTasks(): Promise<Task[]> {
        return this.tasksService.getTasks();
    }

    // ✅ UI Route (Excluded from Swagger)
    @Get('list')
    @Render('tasks')
    @ApiExcludeEndpoint()
    async getTasksUI() {
        return { tasks: await this.tasksService.getTasks() };
    }

    // ✅ API Route - Get Task by ID
    @Get(':id')
    @ApiOperation({ summary: 'Fetch a task by ID' })
    @ApiResponse({ status: 200, description: 'Task found', type: Task })
    @ApiParam({ name: 'id', type: 'string' })
    async getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    // ✅ UI Route (Excluded from Swagger)
    @Get('edit/:id')
    @Render('task-edit')
    @ApiExcludeEndpoint()
    async editTaskPage(@Param('id') id: string): Promise<{ task: Task }> {
        return { task: await this.tasksService.getTaskById(id) };
    }

    // ✅ API Route - Update Task
    @Put('edit/:id')
    @ApiOperation({ summary: 'Update a task' })
    @ApiResponse({ status: 200, description: 'Task updated successfully' })
    @ApiParam({ name: 'id', type: 'string' })
    @ApiBody({ schema: { properties: { title: { type: 'string' }, description: { type: 'string' }, completed: { type: 'boolean' } } } })
    async updateTask(@Param('id') id: string, @Body() body) {
        return this.tasksService.updateTask(id, body.title, body.description, body.completed);
    }

    // ✅ UI Route (Excluded from Swagger)
    @Post('edit/:id')
    @Redirect('/tasks')
    @ApiExcludeEndpoint()
    async updateTaskUI(@Param('id') id: string, @Body() body) {
        await this.tasksService.updateTask(id, body.title, body.description, body.completed);
    }

    // ✅ API Route - Delete Task
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a task' })
    @ApiResponse({ status: 200, description: 'Task deleted successfully' })
    @ApiParam({ name: 'id', type: 'string' })
    async deleteTaskAPI(@Param('id') id: string) {
        return this.tasksService.deleteTask(id);
    }

    // ✅ UI Route (Excluded from Swagger)
    @Get('delete/:id')
    @Redirect('/tasks/list')
    @ApiExcludeEndpoint()
    async deleteTaskUI(@Param('id') id: string) {
        await this.tasksService.deleteTask(id);
    }
}
