import PaymentStatus from "../../../models/payment/payments_status.model";
import PaymentMethod from "../../../models/payment/payments_method.model";
import Payment from "../../../models/payment/payment.model";
import PaymentType from "../../../models/payment/payments_types.model";
import { PaymentTypeEnum } from "../../../app/enums/user/paymentType.enum";
import { PaymentStatusEnum } from "../../../app/enums/user/paymentStatus.enum";
const now = new Date();
export class PaymentSeeder {

    seed = async () => {
        try {
            await PaymentType.bulkCreate(paymentData.paymentTypes);
            console.log('\x1b[32m\nSeed payment types inserted successfully.');
        } catch (error) {
            console.error('Error seeding payments types:', error);
        }
        try {
            await PaymentStatus.bulkCreate(paymentData.PaymentStatuses);
            console.log('\x1b[32m\nSeed PaymentStatus inserted successfully.');
        } catch (error) {
            console.error('Error seeding PaymentStatus:', error);
        }
        try {
            await PaymentMethod.bulkCreate(paymentData.paymentMethods);
            console.log('\x1b[32m\nSeed paymentMethods inserted successfully.');
        } catch (error) {
            console.error('Error seeding paymentMethods:', error);
        }
        try {
            await Payment.bulkCreate(paymentData.payments);
            console.log('\x1b[32m\nSeed payments inserted successfully.');
        } catch (error) {
            console.error('Error seeding payments:', error);
        }

    }
}

const paymentData = {
    PaymentStatuses: [
        {
            id: PaymentStatusEnum.Completed,
            name: 'Completed',
            color: '#1BE125',
            created_at: now,
            updated_at: now,
        }, 
        {
            id: PaymentStatusEnum.Pending,
            name: 'Pending',
            color: '#DAE11B',
            created_at: now,
            updated_at: now,
        },
        {
            id: PaymentStatusEnum.Fail,
            name: 'Fail',
            color: '#E12B1B',
            created_at: now,
            updated_at: now,
        },
    ],
    paymentMethods: [
        {
            name: 'ABA',
            created_at: now,
            updated_at: now,
        }, 
        {
            name: 'ACELEDA',
            created_at: now,
            updated_at: now,
        },
        {
            name: 'Cash',
            created_at: now,
            updated_at: now,
        },
    ],
    paymentTypes: [
        {
            id: PaymentTypeEnum.Booking,
            name: 'booking',
            created_at: now,
            updated_at: now,
        }, 
        {
            id: PaymentTypeEnum.Drink,
            name: 'drink',
            created_at: now,
            updated_at: now,
        },
        {
            id: PaymentTypeEnum.Equiment,
            name: 'equiment',
            created_at: now,
            updated_at: now,
        },
    ],
    payments: [
            { 
                receipt_number: 'RCPT-1001',
                booking_id: 1,  
                method_id: 1,   
                type_id: 1,   
                status_id: 1,
                total_price: 120.50,
                created_at: now,
                updated_at: now,
            },
            {
                receipt_number: 'RCPT-1002',
                booking_id: null,
                method_id: 2,   
                type_id: 2,
                status_id: 2,
                total_price: 85.00,
                created_at: now,
                updated_at: now,
            },
            {
                receipt_number: 'RCPT-1003',
                booking_id: null,
                method_id: 3,   
                type_id: 3,
                status_id: 3,
                total_price: 150.75,
                created_at: now,
                updated_at: now,
            },
    ],



};