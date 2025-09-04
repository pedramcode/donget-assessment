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
import GroupService from './group.service';
import GroupCreateDto from './dto/group.create.dto';
import GroupUpdateDto from './dto/group.update.dto';

@Controller('/group')
@ApiTags('group')
export default class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiOperation({
    description: 'create a new group',
    summary: 'create group',
  })
  async create(@Body(new ValidationPipe()) body: GroupCreateDto) {
    return this.groupService.create(body);
  }

  @Get('/settlement/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'group id',
  })
  @ApiOperation({
    description: "calcualte group's settlements",
    summary: 'settlements',
  })
  async settlement(@Param('id') id: string) {
    return this.groupService.settlement(id);
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'group id',
  })
  @ApiOperation({
    description: 'create a new group',
    summary: 'create group',
  })
  async delete(@Param('id') id: string) {
    return this.groupService.delete(id);
  }

  @Put('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'group id',
  })
  @ApiOperation({
    description: 'update a group',
    summary: 'update group',
  })
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) body: GroupUpdateDto,
  ) {
    return this.groupService.update(id, body);
  }

  @Get('/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'group id',
  })
  @ApiOperation({
    description: 'get a group by id',
    summary: 'get group',
  })
  async get(@Param('id') id: string) {
    return this.groupService.get(id);
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
    description: 'get all groups',
    summary: 'get all groups',
  })
  async getAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.groupService.getAll(page, limit);
  }
}
