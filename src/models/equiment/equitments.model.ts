// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import Sports from '../sport/sports.model';
import EquipmentPayment from './equitment_payment.model';

// ================================================================>> Custom Library


@Table({ tableName: 'equipments', createdAt: 'created_at', updatedAt: 'updated_at', timestamps: true })
class Equipment extends Model<Equipment> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    image: string;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    name: string;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    description: string;

    // Foreign Key for Sport model
    @ForeignKey(() => Sports)
    @Column({ allowNull: true, type: DataType.INTEGER })
    sport_id: number;

    @Column({ allowNull: true, type: DataType.DOUBLE })
    price: number;

    @Column({ allowNull: true, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    updated_at: Date;


    @HasMany(() => EquipmentPayment)
    payments: EquipmentPayment[];

    // Associations (BelongsTo)
    @BelongsTo(() => Sports)
    sport: Sports;
}

export default Equipment;