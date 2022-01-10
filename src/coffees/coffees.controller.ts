import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Res() response): void {
    response.status(HttpStatus.OK).send('This action returns all coffees');
  }

  @Get('/:id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} coffee`;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body): string {
    return body;
    return 'This action adds a new coffee';
  }
}
