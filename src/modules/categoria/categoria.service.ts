import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly repo: Repository<Categoria>,
  ) {}

  create(dto: CreateCategoriaDto) {
    const categoria = this.repo.create(dto);
    return this.repo.save(categoria);
  }

  findAll() {
    return this.repo.find({ relations: ['productos'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['productos'] });
  }

  async update(id: number, dto: CreateCategoriaDto) {
    const categoria = await this.repo.findOneBy({ id });
    if (!categoria) throw new NotFoundException('Categoría no encontrada');
    Object.assign(categoria, dto);
    return this.repo.save(categoria);
  }

  async remove(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Categoría no encontrada');
    return result;
  }
}
