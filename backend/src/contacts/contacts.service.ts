import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEntity } from './entities/contact.entity';
import { ILike, Repository } from 'typeorm';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactsRepository: Repository<ContactEntity>,
  ) {}

  async findAll(): Promise<ContactEntity[]> {
    return await this.contactsRepository.find();
  }

  async findById(id: string): Promise<ContactEntity> {
    const contact = await this.contactsRepository.findOne({
      where: {
        id,
      },
    });
    if (!contact) throw new NotFoundException('Контакт не найден');
    return contact;
  }

  async findAllByName(name: string): Promise<ContactEntity[]> {
    return await this.contactsRepository.find({
      where: {
        name: ILike(name),
      },
    });
  }

  async create(dto: ContactDto): Promise<ContactEntity> {
    const contact = this.contactsRepository.create(dto);
    return await this.contactsRepository.save(contact);
  }

  async update(id: string, dto: ContactDto): Promise<ContactEntity> {
    const contact = await this.findById(id);
    Object.assign(contact, dto);
    return await this.contactsRepository.save(contact);
  }

  async delete(id: string): Promise<string> {
    const contact = await this.findById(id);
    await this.contactsRepository.remove(contact);
    return `контакт ${contact.name} удален`;
  }
}
