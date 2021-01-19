import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
// @desc    Create new Order
// @route Post /api/Order
// @access private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

// @desc    get order by #id
// @route Post /api/Orders/:id
// @access private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});

// @desc    Update order to paid
// @route Post /api/Orders/:id/pay
// @access private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid= true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }
    const updateOrder = await order.save()
    res.json(updateOrder)
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});

// @desc    GET Looged in user Orders
// @route Post /api/Orders/myorders
// @access private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({user: req.user.id});

  res.json(orders)
});

// @desc    GET all Orders
// @route Post /api/Orders
// @access private/admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');

  res.json(orders)
});

// @desc    Update order to Delivered
// @route Post /api/Orders/:id/devliver
// @access private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered= true
    order.deliveredAt = Date.now()
    
    const updateOrder = await order.save()
    res.json(updateOrder)
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});



export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered };
