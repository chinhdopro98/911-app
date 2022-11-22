import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InterpretersService } from './interpreters.service';
import { CreateInterpreterDto } from './dto/create-interpreter.dto';
import { UpdateInterpreterDto } from './dto/update-interpreter.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Action, Role } from 'src/common/interfaces/common.interface';
import { Interpreter } from './entities/interpreter.entity';
import { CheckPolicies } from 'src/casl/casl.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@ApiTags('interpreter')
@Controller('interpreters')
export class InterpretersController {
  constructor(private readonly interpretersService: InterpretersService) {}

  // @Post()
  // create(@Body() createInterpreterDto: CreateInterpreterDto) {
  //   return this.interpretersService.create(createInterpreterDto);
  // }

  @UseGuards(JwtGuard)
  @CheckPolicies((ability) => ability.can(Action.READ, Interpreter))
  @Get('/get-all-interpreter')
  findAll() {
    return this.interpretersService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('/get-interpreter/:id')
  findOne(@Param('id') id: string) {
    return this.interpretersService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch('/update-interpreter/:id')
  update(
    @Param('id') id: string,
    @Body() updateInterpreterDto: UpdateInterpreterDto,
    updateUserDto: UpdateUserDto,
  ) {
    return this.interpretersService.update(
      id,
      updateInterpreterDto,
      updateUserDto,
    );
  }

  @UseGuards(JwtGuard)
  @CheckPolicies((ability) => ability.can(Action.READ, Interpreter))
  @Delete('/delete-interpreter/:id')
  remove(@Param('id') id: string) {
    return this.interpretersService.remove(id);
  }
}
