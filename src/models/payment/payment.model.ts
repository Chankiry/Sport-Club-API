// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey, BelongsTo, HasMany, BeforeCreate, HasOne } from 'sequelize-typescript';
import Booking from '../booking/bookings.model';
import PaymentType from './payments_types.model';
import DrinksPayment from '../drink/drink_payments.model';
import EquipmentPayment from '../equiment/equitment_payment.model';
import PaymentMethod from './payments_method.model';
import PaymentStatus from './payments_status.model';
import { PaymentTypeEnum } from '../../app/enums/user/paymentType.enum';

// ================================================================>> Custom Library


@Table({ tableName: 'payments', createdAt: 'created_at', updatedAt: 'updated_at', timestamps: true })
class Payment extends Model<Payment> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    receipt_number: string;

    // Foreign Key for Booking model
    @ForeignKey(() => Booking)
    @Column({ allowNull: true, type: DataType.INTEGER })
    booking_id: number;

    // Foreign Key for PaymentType model
    @ForeignKey(() => PaymentStatus)
    @Column({ allowNull: true, type: DataType.INTEGER })
    status_id: number;

    @ForeignKey(() => PaymentMethod)
    @Column({ allowNull: true, type: DataType.INTEGER })
    method_id: number;

    @ForeignKey(() => PaymentType)
    @Column({ allowNull: true, type: DataType.INTEGER })
    type_id: number;

    @Column({ allowNull: true, type: DataType.DOUBLE })
    total_price: number;

    @Column({ allowNull: true, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    updated_at: Date;

    // Associations (BelongsTo)
    @BelongsTo(() => Booking)
    booking: Booking;

    @BelongsTo(() => PaymentStatus)
    payment_status: PaymentStatus;

    @BelongsTo(() => PaymentMethod)
    payment_method: PaymentMethod;

    @BelongsTo(() => PaymentType)
    payment_type: PaymentType;

    @HasMany(() => DrinksPayment)
    drinks_payments: DrinksPayment[];

    @HasOne(() => EquipmentPayment)
    equipments_payment: EquipmentPayment;

    @BeforeCreate
    static async assignUniqueCode(instance: Payment) {
        const latestPayment = await Payment.findOne({ 
            where: {type_id: instance.type_id},
            order: [['id', 'DESC']] 
        });

        const id = latestPayment ? latestPayment.id + 1 : 0;
        const paddedCounter = id.toString().padStart(4, '0');
        if(instance.type_id == PaymentTypeEnum.Booking){
            instance.receipt_number = `BK${paddedCounter}`;
        }
        else if(instance.type_id == PaymentTypeEnum.Drink){
            instance.receipt_number = `DR${paddedCounter}`;
        }
        else if(instance.type_id == PaymentTypeEnum.Equiment){
            instance.receipt_number = `EQ${paddedCounter}`;
        }

    }
    
}

export default Payment;
