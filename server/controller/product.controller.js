import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products)
      return res.status(404).json({ message: "No products found" });

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getNewArrival = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(6);
    if (!products)
      return res.status(404).json({ message: "No products found" });

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCategoryProducts = async (req, res) => {
  const { category } = req.params;
  try {
    const product = await Product.find({ category });

    if (!product)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getRelatedProducts = async (req, res) => {
  const { category, currentId } = req.params;
  try {
    const products = await Product.find({
      _id: { $ne: currentId },
      category,
    })
      .limit(8)
      .select("-reviews");

    if (products.length === 0) {
      return res.status(404).json({ message: "No related products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const peopleAlsoBought = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 1,
          name: 1,
          images: 1,
          price: 1,
          category: 1,
        },
      },
    ]);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id)
      .populate({
        path: "reviews.user",
        select: "-password",
      })
      .populate("category")
      .populate("images");
    if (!product) return res.status(404).json({ message: "Product not found" });

    const totalRatings = product.reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    const averageRating = totalRatings / product.reviews.length;

    product.averageRating = averageRating;

    res.status(200).json({ product, averageRating });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const searchProduct = async (req, res) => {
  const { query } = req.params;

  try {
    const product = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const pageNation = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const product = await Product.find().skip(skip).limit(limit);

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const createProduct = async (req, res) => {
  const { name, description, category, price } = req.body;

  if (!name || !description || !category || !price) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "Please upload at least one image" });
    }

    const images = req.files.map((file) => {
      const fileName = file.filename;
      return `http://localhost:8000/uploads/${fileName}`;
    });

    const product = await Product.create({
      name,
      description,
      category,
      price,
      images,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const toggleIsFeature = async (req, res) => {
  const { id: productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    product.isFeatured = !product.isFeatured;
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const reviews = async (req, res) => {
  const { id } = req.params;
  const { comment, rating } = req.body;
  if (!comment) {
    return res.status(400).json({ message: "Please provide comment " });
  }

  const userId = req.user._id;
  try {
    const product = await Product.findById(id).populate({
      path: "reviews.user",
      select: "-password",
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (rating < 1 || rating > 5)
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });

    const newReview = {
      user: userId,
      rating,
      comment,
    };
    product.reviews.push(newReview);
    await product.save();

    res.status(201).json(product);
    // products.reviews
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByPrice = async (req, res) => {
  const { gte, lte } = req.query;
  try {
    const products = await Product.find({
      price: { $gte: gte, $lte: lte },
    }).populate("reviews.user", "-password");
    res.status(200).json(products);

    // let priceQuery = {};
    // if (gte || lte) {
    //   priceQuery.price = {};
    //   if (gte) {
    //     const gteValue = parseInt(gte);
    //     if (!isNaN(gteValue)) {
    //       priceQuery.price.$gte = gteValue;
    //     }
    //   }
    //   if (lte) {
    //     const lteValue = parseInt(lte);
    //     if (!isNaN(lteValue)) {
    //       priceQuery.price.$lte = lteValue;
    //     }
    //   }
    // }
    // const products = await Product.find(priceQuery).populate(
    //   "reviews.user",
    //   "-password"
    // );
    // res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(404);
  }
};
