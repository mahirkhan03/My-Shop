const mongoose = require('mongoose');
const { Schema } = mongoose;

// 🧾 Product details inside order
const productDetailsSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
}, { _id: false });

// 📦 Shipping address
const shippingDetailsSchema = new Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
}, { _id: false });

// 🚚 Order status enum
const ORDER_STATUSES = {
  PLACED: 0,
  CONFIRMED: 1,
  PACKED: 2,
  SHIPPED: 3,
  OUT_FOR_DELIVERY: 4,
  DELIVERED: 5,
  CANCELLED: 6,
  RETURNED: 7,
};

// 🧾 Main order schema
const orderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },

  product_details: {
    type: [productDetailsSchema],
    required: true
  },

  shipping_details: {
    type: shippingDetailsSchema,
    required: true
  },

  order_total: { type: Number, required: true },

  payment_mode: {
    type: String,
    enum: ['cod', 'online'], // cod = 0, online = 1 (in your logic)
    required: true
  },

  payment_status: {
    type: String,
    enum: ['unpaid', 'paid', 'failed'],
    default: 'unpaid'
  },

  razorpay_order_id: { type: String, default: null },
  razorpay_payment_id: { type: String, default: null },
  razorpay_signature: { type: String, default: null },

  paid_at: { type: Date },
  delivered_at: { type: Date },

  order_status: {
    type: Number,
    enum: Object.values(ORDER_STATUSES),
    default: ORDER_STATUSES.PLACED
  },

}, { timestamps: true });

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
