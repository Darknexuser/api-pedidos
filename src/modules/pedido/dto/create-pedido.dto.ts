import { IsNumber, IsArray } from 'class-validator';

export class CreatePedidoDto {
  @IsNumber()
  usuarioId: number;

  @IsArray()
  productosIds: number[];
}
