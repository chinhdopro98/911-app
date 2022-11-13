import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InterpretersService } from './interpreters.service';
import { CreateInterpreterDto } from './dto/create-interpreter.dto';
import { UpdateInterpreterDto } from './dto/update-interpreter.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Action, Role } from 'src/common/interfaces/common.interface';
import { Interpreter } from './entities/interpreter.entity';
import { CheckPolicies } from 'src/casl/casl.decorator';

@ApiTags('interpreter')
@Controller('interpreters')
export class InterpretersController {
  constructor(private readonly interpretersService: InterpretersService) { }

  // @Post()
  // create(@Body() createInterpreterDto: CreateInterpreterDto) {
  //   return this.interpretersService.create(createInterpreterDto);
  // }

  @Get("/get-all-interpreter")
  @CheckPolicies((ability) => ability.can(Action.READ, Interpreter))
  findAll() {
    return this.interpretersService.findAll();
  }

  @Get('/get-interpreter/:id')
  findOne(@Param('id') id: string) {
    return this.interpretersService.findOne(id);
  }

  @Patch('/update-interpreter/:id')
  update(@Param('id') id: string, @Body() updateInterpreterDto: UpdateInterpreterDto, updateUserDto: UpdateUserDto) {
    return this.interpretersService.update(id, updateInterpreterDto, updateUserDto);
  }

  @Delete('/delete-interpreter/:id')
  remove(@Param('id') id: string) {
    return this.interpretersService.remove(id);
  }
}
