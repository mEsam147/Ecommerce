import User from "../models/user.model.js";
import Product from "../models/product.model.js";

export const getAllCartItems = async (req, res) => {
  try {
    const user = req.user;

    // Check if the user has cart items
    if (!user.cartItems || user.cartItems.length === 0) {
      return res.status(200).json([]);
    }

    const products = await Product.find({
      _id: { $in: user.cartItems.map((item) => item.id) },
    });

    const cartItems = products.map((product) => {
      const cartItem = req.user.cartItems.find(
        (cartItem) => cartItem.id === product.id
      );
      return {
        ...product.toObject(),
        quantity: cartItem.quantity,
      };
    });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
export const addToCart = async (req, res) => {
  const { id: productId } = req.params;
  try {
    const user = req.user;

    const cartItem = user.cartItems.find((item) => item.id === productId);

    if (cartItem) {
      cartItem.quantity += 1;
      await user.save();
    } else {
      user.cartItems.push({ _id: productId, quantity: 1 });
    }

    await user.save();

    res.json({ message: "Item added to cart", cartItem: cartItem });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const removeItem = async (req, res) => {
  const { id: productId } = req.params;
  try {
    const user = req.user;
    const removeItem = user.cartItems.filter((item) => item.id !== productId);
    user.cartItems = removeItem;
    await user.save();
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const user = req.user;
    user.cartItems = [];
    await user.save();
    res.json({ message: "Cart cleared" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const cartItem = user.cartItems.find((item) => item.id === productId);

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (quantity < 0) {
      return res.status(400).json({ message: "Quantity must be a non-negative integer" });
    }

    if (quantity === 0) {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    } else {
      cartItem.quantity = quantity;
    }

    await user.save();

    res.json({ message: "Quantity updated", cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
