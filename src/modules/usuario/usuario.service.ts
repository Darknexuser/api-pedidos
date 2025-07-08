@Injectable()
export class UsuarioService {
  constructor(@InjectRepository(Usuario) private repo: Repository<Usuario>) {}

  create(dto: CreateUsuarioDto) {
    const user = this.repo.create(dto);
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find({ relations: ['pedidos'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['pedidos'] });
  }

  update(id: number, dto: UpdateUsuarioDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
