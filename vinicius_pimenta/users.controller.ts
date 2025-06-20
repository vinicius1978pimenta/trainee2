import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UppercasePipe } from './uppercase.pipe';

@Controller('users')
export class UserController {
  
  @Get(':name')
  getUser(@Param('name', UppercasePipe) name: string) {
    return {
      message: `Olá, ${name}!`,
      timestamp: new Date().toISOString()
    };
  }
  
  @Post()
  createUser(@Body('name', UppercasePipe) name: string) {
    return {
      message: 'Usuário criado!',
      userName: name
    };
  }
}