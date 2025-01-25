import { PaymentMethodFactory, PaymentService } from "./services/payment.service";

const factory = new PaymentMethodFactory();

const creditCardInstance = new PaymentService(factory,'credit_card');
const stripeInstance = new PaymentService(factory, 'stripe');
const paypalInstance = new PaymentService(factory, 'paypal');

creditCardInstance.processPayment({amount:12, currency: '$'});
stripeInstance.processPayment({amount:12, currency: '$'});
paypalInstance.processPayment({amount:12, currency: '$'});