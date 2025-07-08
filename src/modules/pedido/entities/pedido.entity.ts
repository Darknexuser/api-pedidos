import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Producto } from '../../producto/entities/producto.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => Usuario, (usuario) => usuario.pedidos)
  usuario: Usuario;

  @ManyToMany(() => Producto)
  @JoinTable()
  productos: Producto[];
}
