// ===========================================================================>> Core Library
import { BadRequestException, Get, Injectable, NotFoundException } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op, Sequelize }       from 'sequelize';
import * as moment  from 'moment';
import { InjectModel } from '@nestjs/sequelize';
import Equipment from 'src/models/equiment/equitments.model';
import { CreateEquipmentsaleDTO } from './dto';
import EquipmentPayment from 'src/models/equiment/equitment_payment.model';
import Payment from 'src/models/payment/payment.model';
import User from 'src/models/user/user.model';
import PaymentMethod from 'src/models/payment/payments_method.model';


// ===========================================================================>> Custom Library

// ===>> Model


@Injectable()
export class AdminEquipmentSaleService {
    constructor(
        @InjectModel(EquipmentPayment)
        private readonly  EquipmentPaymentModel: typeof EquipmentPayment,) { }
 
    // ==================================================================>> Get data EquipmentSale

    async getData() { 
        try {
            const sales = await this.EquipmentPaymentModel.findAll({
                include: ['equipment', 'user', 'payment'],
                order: [['created_at', 'DESC']],
            });

            let totalSalesAmount = 0;
            let totalQuantitySold = 0;

            const formattedSales = sales.map(sale => {
                const qty = sale.qty || 0;
                const totalPrice = sale.total_price || 0;

                totalSalesAmount += totalPrice;
                totalQuantitySold += qty;

                return sale;
            });

            const averageSalePrice = totalQuantitySold > 0
                ? parseFloat((totalSalesAmount / totalQuantitySold).toFixed(2))
                : 0;

            return {
                sales: formattedSales,
                meta: {
                    totalSalesAmount: parseFloat(totalSalesAmount.toFixed(2)),
                    totalQuantitySold,
                    averageSalePrice
                }
            };

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message);
        }
    }
    async create(body: any) {
        try {
            // Check if payment_id exists (if provided)
            if (body.payment_id) {
                const payment = await Payment.findByPk(body.payment_id);
                if (!payment) {
                    throw new BadRequestException('Payment method not found.');
                }
            }

            // Fetch equipment to get its price
            const equipment = await Equipment.findByPk(body.equipments_id);
            if (!equipment) {
                throw new BadRequestException('Equipment not found.');
            }

            const total_price = equipment.price * (body.qty || 1);
            const now = new Date();

            const created = await EquipmentPayment.create({
                user_id: body.user_id,
                equipments_id: body.equipments_id,
                qty: body.qty,
                payment_id: body.payment_id,
                total_price,
                created_at: now,
                updated_at: now,
            });

            // Add total_price to the response (Sequelize returns it anyway)
            return created;
        } catch (error) {
            console.error(error);
            throw new BadRequestException('Failed to create equipment: ' + error.message);
        }
    }


    async update(id: string, body: Partial<CreateEquipmentsaleDTO>) {
        try {
            // Check if payment_id exists (if provided)
            if (body.payment_id) {
                const payment = await Payment.findByPk(body.payment_id);
                if (!payment) {
                    throw new BadRequestException('Payment method not found.');
                }
            }

            const sale = await this.EquipmentPaymentModel.findByPk(id);
            if (!sale) {
                throw new NotFoundException('Equipment not found');
            }

            // Use existing or new equipment/qty values
            const equipmentId = body.equipments_id || sale.equipments_id;
            const qty = body.qty || sale.qty;

            // Fetch equipment to get its price
            const equipment = await Equipment.findByPk(equipmentId);
            if (!equipment) {
                throw new BadRequestException('Equipment not found.');
            }

            const total_price = equipment.price * qty;

            await sale.update({
                user_id: body.user_id !== undefined ? body.user_id : sale.user_id,
                equipments_id: equipmentId,
                qty: qty,
                payment_id: body.payment_id !== undefined ? body.payment_id : sale.payment_id,
                total_price: total_price,
                updated_at: new Date(),
            });

            // Return the updated sale, including total_price
            return sale;
        } catch (error) {
            console.error(error);
            throw new BadRequestException('Failed to update equipment: ' + error.message);
        }
    }

    async delete(id: string) {
        try {
            const sale = await this.EquipmentPaymentModel.findByPk(id);
            if (!sale) {
                throw new NotFoundException('Equipment not found');
            }
            await sale.destroy();
            return { message: 'Equipment deleted succesfully', id };
        } catch (error) {
            console.error(error);
            throw new BadRequestException('Failed to deleted equipment: ' + error.message);
        }
    }
    async setupData() {
        try {
            // Fetch users
            const users = await User.findAll({
            attributes: ['id', 'name'],
            order: [['name', 'ASC']]
            });

            // Fetch payments
            const payments = await PaymentMethod.findAll({
            attributes: ['id', 'name'],
            order: [['id', 'ASC']]
            });

            // Fetch equipments
            const equipments = await Equipment.findAll({
            attributes: ['id', 'name'],
            order: [['name', 'ASC']]
            });

            return {
            users: users.map(u => ({
                id: u.id,
                name: u.name
            })),
            payments: payments.map(p => ({
                id: p.id,
                name: p.name
            })),
            equipments: equipments.map(e => ({
                id: e.id,
                name: e.name
            })),
            };
        } catch (error) {
            throw new BadRequestException('Failed to load setup data');
        }
        }


}
