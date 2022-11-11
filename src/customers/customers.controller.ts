import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CustomersService } from './customers.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }


  @Get('/get-all-customer')
  findAll() {
    return this.customersService.findAll();
  }

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
