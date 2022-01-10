import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Res() response): void {
    response.status(HttpStatus.OK).send('This action returns all coffees');
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns  #${id} coffee`;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body): string {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string,@Body() body) {
   return {body,id};
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes #${id} coffee`;
  }
}
