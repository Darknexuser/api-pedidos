import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { Categoria } from '../categoria/entities/categoria.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly repo: Repository<Producto>,
    @InjectRepository(Categoria)
    private readonly catRepo: Repository<Categoria>
  ) {}

  async create(dto: CreateProductoDto) {
    const categoria = await this.catRepo.findOneBy({ id: dto.categoriaId });
    const producto = this.repo.create({ ...dto, categoria });
    return this.repo.save(producto);
  }

  findAll() {
    return this.repo.find({ relations: ['categoria'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['categoria'] });
  }

  async update(id: number, dto: CreateProductoDto) {
    const producto = await this.repo.findOneBy({ id });
    if (!producto) throw new NotFoundException('Producto no encontrado');
    const categoria = await this.catRepo.findOneBy({ id: dto.categoriaId });
    Object.assign(producto, dto, { categoria });
    return this.repo.save(producto);
  }

  async remove(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Producto no encontrado');
    return result;
  }
}