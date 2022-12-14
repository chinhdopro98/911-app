import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { PoliciesGuard } from 'src/casl/guard/policy.guard';
import { CheckPolicies } from 'src/casl/casl.decorator';
import { Action } from 'src/common/interfaces/common.interface';
import { User } from './entities/user.entity';

@ApiTags('admin-[user]')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.MANAGE, User))
  @Get("/get-all-users")
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.READ, User))
  @Get('/get-user/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.READ, User))
  @Get('/get-all-customers')
  findAllCustomers() {
    return this.usersService.findAllCustomers();
  }

  @UseGuards(JwtGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.READ, User))
  @Get('/get-all-interpreters')
  findAllInterpreters() {
    return this.usersService.findAllInterpreters();
  }


}
