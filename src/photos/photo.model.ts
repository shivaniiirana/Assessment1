// src/photos/photo.model.ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/user.model';

@Table({ tableName: 'photos', timestamps: true })
export class Photo extends Model<Photo> {
  @Column({ type: DataType.STRING, allowNull: false })
  url: string;

  @Column({ type: DataType.STRING, allowNull: false })
  fileName: string;

  @Column({ type: DataType.INTEGER })
  size: number;

  @Column({ type: DataType.STRING })
  caption: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User; // Defines the relationship with the User model
}
