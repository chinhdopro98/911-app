import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/common/interfaces/common.interface';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createCustomerDto: CreateCustomerDto) {
    const { role = Role.CUSTOMER, userId } = createCustomerDto;
    const customer = await this.customerRepository.create({
      role,
      userId,
    });

    return await this.customerRepository.save(customer);
  }

  async findAll() {
    const customers = await this.userRepository.find({
      relations: ['customer'],
    });

    return customers;
  }

  async findOne(userId: string) {
    const customer = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['customer']
    });

    return customer;
  }

  async update(userId: string, updateCustomerDto: UpdateCustomerDto, updateUserDto: UpdateUserDto) {
    await this.userRepository.createQueryBuilder("user")
      .update(User)
      .set(updateUserDto)
      .where("id = :id", { id: userId })
      .execute();

    await this.customerRepository.createQueryBuilder("interpreter")
      .update(Customer)
      .set(updateCustomerDto)
      .where("userId = :userId", { userId })
      .execute();

    const userUpdated = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['interpreter']
    });

    return { status: HttpStatus.OK, message: `Customer ${userUpdated} updated successfully` };

  }

  async remove(userId: string) {
    await this.customerRepository.createQueryBuilder("customer")

      .delete()
      .where("userId = :userId", { userId })
      .execute();

    await this.userRepository.createQueryBuilder("user")
      .delete()
      .where("id = :id", { id: userId })
      .execute();

    return { message: "Deleted successfully" };
  }
}
