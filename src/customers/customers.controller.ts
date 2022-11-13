import { Controller, Get, UseGuards, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CheckPolicies } from 'src/casl/casl.decorator';
import { Action } from 'src/common/interfaces/common.interface';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CustomersService } from './customers.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@ApiTags('customer')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @UseGuards(JwtGuard)
  @CheckPolicies((ability) => ability.can(Action.READ, Customer))
  @Get('/get-all-customer')
  findAll() {
    return this.customersService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('/get-customer/:id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Patch('/update-customer/:id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto, updateUserDto: UpdateUserDto) {
    return this.customersService.update(id, updateCustomerDto, updateUserDto);
  }

  @Delete('/delete-customer/:id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
