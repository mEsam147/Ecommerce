import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    reviews: [
      {
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          required: [true, "text is Required"],
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true],
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
