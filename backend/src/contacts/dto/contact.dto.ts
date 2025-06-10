import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsEmail,
} from 'class-validator';

export class ContactDto {
  @IsNotEmpty({ message: 'Имя контакта не должно быть пустым' })
  @IsString({ message: 'Имя контакта должно быть строкой' })
  name: string;

  @IsNotEmpty({ message: 'Номер телефона не должен быть пустым' })
  @IsPhoneNumber('RU', {
    message: 'Телефон должен быть корректным в РФ формата "+79123456789"',
  })
  phone: string;

  @IsNotEmpty({ message: 'Email не должен быть пустым' })
  @IsEmail({}, { message: 'Email должен быть корректным' })
  email: string;

  @IsArray({ message: 'Теги должны быть массивом' })
  @IsString({ each: true, message: 'Каждый тег должен быть строкой' })
  @IsOptional()
  tags: string[];
}
