import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  precio: number;

  @IsNumber()
  categoriaId: number;
}