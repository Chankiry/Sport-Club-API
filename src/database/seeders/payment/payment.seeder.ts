import Payment from "../../..//models/payment/payment.model";
import PaymentType from "../../../models/payment/payments_types.model";
const now = new Date();
export class PaymentSeeder {

    seed = async () => {
        try {
            await PaymentType.bulkCreate(paymentData.paymentTypes);
            console.log('\x1b[32m\nSeed payment types inserted successfully.');
        } catch (error) {
            console.error('Error seeding payments:', error);
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
            paymentTypes: [
            {
                name: 'Cash',
                created_at: now,
                updated_at: now,
            }, 
            {
                name: 'Credit Card',
                created_at: now,
                updated_at: now,
            },
            {
                name: 'Bank Transfer',
                created_at: now,
                updated_at: now,
            },
        ],
    payments: [
            { 
                receipt_number: 'RCPT-1001',
                booking_id: 1,  
                type_id: 1,   
                is_paid: true,
                total_price: 120.50,
                created_at: now,
                updated_at: now,
            },
            {
                receipt_number: 'RCPT-1002',
                booking_id: 2,
                type_id: 2,
                is_paid: false,
                total_price: 85.00,
                created_at: now,
                updated_at: now,
            },
            {
                receipt_number: 'RCPT-1003',
                booking_id: 3,
                type_id: 1,
                is_paid: true,
                total_price: 150.75,
                created_at: now,
                updated_at: now,
            },
    ],



};