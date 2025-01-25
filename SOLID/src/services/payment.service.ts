// Base payment interface - common functionality
interface IPaymentMethods {
    processPayment(paymentDetails: any): Promise<any>,
    getPaymentDetails(paymentId: string): Promise<any>,
    getPaymentStatus(paymentId: string): Promise<any>,
}

// Specific payment interface - Inteface seggregating principle (ISP) in action
interface ICreditCardPayment extends IPaymentMethods {
    getCreditCardNumber(): string,
}
interface IPayPalPayment extends IPaymentMethods {
    getPayPalAccount(): any,
}
interface IStripePayment extends IPaymentMethods {
    getStripeID(): string,
}

// Factory interface - Depdendency inversion principle (DIP) in action
interface IPaymentMethodFactory {
    getPayment(type: 'credit_card' | 'stripe' | 'paypal'): IPaymentMethods
}

export class PaymentMethodFactory implements IPaymentMethodFactory {
    public getPayment(type: 'credit_card' | 'stripe' | 'paypal') {
        switch(type) {
            case 'credit_card':
                return new CreditCardPayment();
            case 'paypal':
                return new PaypalPayment();
            case 'stripe':
                return new StripePayment();
            default:
                throw new Error(`No payment system has been found named as ${type}`);
        }
    }
}

// Payment method implementation - Open/close priciple in action ( each payment method allowed for extension, but not allowed for modification)
export class CreditCardPayment implements ICreditCardPayment {

    private creditCardNumber: string = '41111111111111';

    public async processPayment (paymentDetails: any) {
        console.log(`Processing credit card payments for ${paymentDetails.currency} ${paymentDetails.amount}`);
        await new Promise(r => setTimeout(r, 2000));
        console.log('Credit card payment processed successfully');
    };

    public async getPaymentDetails(paymentId: string): Promise<string> {
        return `Credit card details for ID: ${paymentId}`;
    }

    public async getPaymentStatus(paymentId: string): Promise<string> {
        return `Credit card payment status for ID: ${paymentId} is successful`;
    }

    public getCreditCardNumber(): string {
        return this.creditCardNumber;
    }
}

export class StripePayment implements IStripePayment {
    private stripeID: string = 'stripe_123456';

    public async processPayment (paymentDetails: any): Promise<void> {
        console.log(`Processing Stripe payment for ${paymentDetails.currency} ${paymentDetails.amount}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Stripe payment processed successfully');
    };

    public async getPaymentDetails(paymentId: string): Promise<string> {
        return `Stripe payment details for ID: ${paymentId}`;
    }

    public async getPaymentStatus(paymentId: string): Promise<string> {
        return `Stripe payment status for ID: ${paymentId} is successfull`;
    }

    public getStripeID(): string {
        return this.stripeID;
    }
}

export class PaypalPayment implements IPayPalPayment {
    private paymentId: string = 'paypa_account_123';

    public async processPayment (paymentDetails: any): Promise<void> {
        console.log(`Processing paypal payments for ${paymentDetails.currency} ${paymentDetails.amount}`);
        await new Promise(r => setTimeout(r, 2000));
        console.log(`Paypal payment processed successfully`);
    };

    public async getPaymentDetails(paymentId: string): Promise<string> {
        return `Paypal payment details for ID: ${paymentId}`;
    }

    public async getPaymentStatus(paymentId: string) {
        return `Paypal payment status for ${paymentId} is successfull`;
    }

    public getPayPalAccount() : string {
        return this.paymentId;
    }
}

// PaymentService depends on abstraction (IPaymentMethodFactory and IPaymentMethods)
// rather than concrete implementations, demonstrating Dependency Inversion
export class PaymentService {
    private paymentMethod: IPaymentMethods;
    constructor(private readonly paymentFactory: IPaymentMethodFactory, paymentMethod: 'credit_card' | 'stripe' | 'paypal') {
        this.paymentMethod = this.paymentFactory.getPayment(paymentMethod);
    }

    public processPayment(paymentDetails: any) {
        return this.paymentMethod.processPayment(paymentDetails);
    }

    public getPaymentDetails(paymentId: string) {
        return this.paymentMethod.getPaymentDetails(paymentId);
    }

}
