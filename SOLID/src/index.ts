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

class PaymentMethodFactory implements IPaymentMethodFactory {
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
class CreditCardPayment implements ICreditCardPayment {

    public async processPayment (paymentDetails: any) {
        console.log('processing credit card payments');
    };

    public async getPaymentDetails(paymentId: string) {
        return `return from credit card ${paymentId}`;
    }

    public async getPaymentStatus(paymentId: string) {
        return 'credit card payment failed';
    }

    public getCreditCardNumber() {
        return '123';
    }
}

class StripePayment implements IStripePayment {

    public async processPayment (paymentDetails: any) {
        console.log('processing stripe payments');
    };

    public async getPaymentDetails(paymentId: string) {
        return `return from stripe card ${paymentId}`;
    }

    public async getPaymentStatus(paymentId: string) {
        return 'stripe payment failed';
    }

    public getStripeID(): string {
        return '123';
    }
}

class PaypalPayment implements IPayPalPayment {

    public async processPayment (paymentDetails: any) {
        console.log('processing paypal payments');
    };

    public async getPaymentDetails(paymentId: string) {
        return `return from paypal ${paymentId}`;
    }

    public async getPaymentStatus(paymentId: string) {
        return 'paypal payment failed';
    }

    public getPayPalAccount() {
        return '123';
    }
}

// PaymentService depends on abstraction (IPaymentMethodFactory and IPaymentMethods)
// rather than concrete implementations, demonstrating Dependency Inversion
class PaymentService {
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

const factory = new PaymentMethodFactory();

const creditCardInstance = new PaymentService(factory,'credit_card');
const stripeInstance = new PaymentService(factory, 'stripe');
const paypalInstance = new PaymentService(factory, 'paypal');

creditCardInstance.processPayment({});
stripeInstance.processPayment({});
paypalInstance.processPayment({});
