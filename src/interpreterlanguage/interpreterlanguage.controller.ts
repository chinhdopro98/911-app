import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InterpreterlanguageService } from './interpreterlanguage.service';
import { CreateInterpreterlanguageDto } from './dto/create-interpreterlanguage.dto';

import { UpdateInterpreterlanguageDto } from './dto/update-interpreterlanguage.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('interpreterlanguage')
@Controller('interpreterlanguage')
export class InterpreterlanguageController {
  constructor(
    private readonly interpreterlanguageService: InterpreterlanguageService,
  ) {}

  @Post()
  create(@Body() createInterpreterlanguageDto: CreateInterpreterlanguageDto) {
    return this.interpreterlanguageService.create(createInterpreterlanguageDto);
  }
  @Get('/get-interpreterlanguage')
  findAll() {
    return this.interpreterlanguageService.findAll();
  }

  @Get('/get-interpreterlanguage-language/:id')
  findOneLanguage(@Param('id') id: string) {
    return this.interpreterlanguageService.findOneLanguage(+id);
  }

  @Get('/get-interpreterlanguage-interpreter/:id')
  findOneInterpreter(@Param('id') id: string) {
    return this.interpreterlanguageService.findOneInterpreter(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInterpreterlanguageDto: UpdateInterpreterlanguageDto,
  ) {
    return this.interpreterlanguageService.update(
      +id,
      updateInterpreterlanguageDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interpreterlanguageService.remove(+id);
  }
}
