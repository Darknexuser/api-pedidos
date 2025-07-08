import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Producto } from '../producto/entities/producto.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly repo: Repository<Pedido>,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
  ) {}

  async create(dto: CreatePedidoDto) {
    const usuario = await this.usuarioRepo.findOneBy({ id: dto.usuarioId });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const productos = await this.productoRepo.findByIds(dto.productosIds);
    const pedido = this.repo.create({ fecha: new Date(), usuario, productos });
    return this.repo.save(pedido);
  }

  findAll() {
    return this.repo.find({ relations: ['usuario', 'productos'] });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['usuario', 'productos'],
    });
  }

  async remove(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Pedido no encontrado');
    return result;
  }
}
