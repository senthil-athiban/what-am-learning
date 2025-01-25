"use strict";
const factory = new PaymentMethodFactory();
const creditCardInstance = new PaymentService(factory, 'credit_card');
const stripeInstance = new PaymentService(factory, 'stripe');
const paypalInstance = new PaymentService(factory, 'paypal');
creditCardInstance.processPayment({});
stripeInstance.processPayment({});
paypalInstance.processPayment({});
