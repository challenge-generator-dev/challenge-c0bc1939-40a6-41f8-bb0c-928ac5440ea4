import { IsString, IsEmail, IsNotEmpty, IsDateString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez García',
    minLength: 1,
    maxLength: 100,
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(1, { message: 'El nombre debe tener al menos 1 carácter' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Dirección de correo electrónico del usuario',
    example: 'juan.perez@pragma.com.co',
    format: 'email',
  })
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  @MaxLength(255, { message: 'El email no puede exceder 255 caracteres' })
  email: string;

  @ApiPropertyOptional({
    description: 'Fecha de nacimiento del usuario en formato ISO 8601',
    example: '1995-06-15',
    type: String,
    format: 'date',
  })
  @IsDateString({}, { message: 'La fecha de nacimiento debe ser una fecha válida en formato ISO 8601' })
  birthDate: string;
}