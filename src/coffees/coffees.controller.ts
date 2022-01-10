import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(): string {
    return 'This action returns all coffees';
  }

  @Get('/:id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} coffee`;
  }

  @Post()
  create(@Body() body): string {
    return body;
    return 'This action adds a new coffee';
  }
}
