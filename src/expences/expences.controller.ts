import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import ExpencesService from './expences.service';
import ExpencesCreateDto from './dto/expences.create.dto';
import ExpencesUpdateDto from './dto/expences.update.dto';

@Controller('/expences')
@ApiTags('expences')
export default class ExpencesController {
  constructor(private readonly expencesService: ExpencesService) {}

  @Post()
  @ApiOperation({
    description: 'create a new expence',
    summary: 'create expence',
  })
  async create(@Body(new ValidationPipe()) body: ExpencesCreateDto) {
    return this.expencesService.create(body);
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'expence id',
  })
  @ApiOperation({
    description: 'create a new expence',
    summary: 'create expence',
  })
  async delete(@Param('id') id: string) {
    return this.expencesService.delete(id);
  }

  @Put('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'expence id',
  })
  @ApiOperation({
    description: 'update a expence',
    summary: 'update expence',
  })
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) body: ExpencesUpdateDto,
  ) {
    return this.expencesService.update(id, body);
  }

  @Get('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'expence id',
  })
  @ApiOperation({
    description: 'get a expence by id',
    summary: 'get expence',
  })
  async get(@Param('id') id: string) {
    return this.expencesService.get(id);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    type: 'number',
    description: 'page',
    default: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    description: 'limit',
    default: 10,
  })
  @ApiOperation({
    description: 'get all expences',
    summary: 'get all expences',
  })
  async getAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.expencesService.getAll(page, limit);
  }
}
