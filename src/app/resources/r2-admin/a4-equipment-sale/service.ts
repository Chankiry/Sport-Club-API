// ===========================================================================>> Core Library
import { BadRequestException, Get, Injectable, NotFoundException } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op, Sequelize }       from 'sequelize';
import * as moment  from 'moment';
import { InjectModel } from '@nestjs/sequelize';
import Equipment from 'src/models/equiment/equitments.model';
import { CreateEquipmentsaleDTO } from './dto';
import EquipmentPayment from 'src/models/equiment/equitment_payment.model';


// ===========================================================================>> Custom Library

// ===>> Model


@Injectable()
export class AdminEquipmentSaleService {
    constructor(
        @InjectModel(EquipmentPayment)
        private readonly  EquipmentPaymentModel: typeof EquipmentPayment,) { }
 
    // ==================================================================>> Get data EquipmentSale
    // @Get('admin/equipment-sale')
    async getData() { 
        try {
            
            const sale = await this.EquipmentPaymentModel.findAll({
                include: ['equipment', 'user', 'payment'],
                order: [['created_at', 'DESC']],
            });
            return sale;

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
        }
    }

    async create(body: any) {
        try {
            const now =new Date();
            const created = await EquipmentPayment.create({
                user_id: body.user_id,
                equipments_id: body.equipments_id,
                qty: body.qty,
                payment_id: body.payment_id,
                total_price: body.total_price,
                created_at: now,
                updated_at: now,

            });
            return created;
        } catch (error) {
            console.error(error);
            throw new BadRequestException('Failed to create equipment: ' + error.message);
        }
    }

    async update(id: string, body: Partial<CreateEquipmentsaleDTO>) {
        try {
            const sale = await this.EquipmentPaymentModel.findByPk(id);
            if (!sale) {
                throw new NotFoundException('Equipment not found');
            }
            await sale.update({
                user_id: body.user_id,
                equipments_id: body.equipments_id,
                qty: body.qty,
                payment_id: body.payment_id,
                total_price: body.total_price,
                updated_at: new Date(),
            });
            return sale;
        }   catch (error) {
            console.error(error);
            throw new BadRequestException('Failed to update equipment' + error.message);
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

}
