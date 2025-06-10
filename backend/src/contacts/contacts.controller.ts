import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactDto } from './dto/contact.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.contactsService.findAll();
  }

  @Get('search')
  @UseGuards(JwtAuthGuard)
  async searchByName(@Query('name') name: string) {
    return this.contactsService.findAllByName(name);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: ContactDto) {
    return this.contactsService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: ContactDto) {
    return this.contactsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return this.contactsService.delete(id);
  }
}
