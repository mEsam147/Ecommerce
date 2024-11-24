import React, { useState } from "react";
import { Product } from "../../utils/ProductInterFace";
import { useCartStore } from "../../store/useCartStore";
import axios from "../../utils/Axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { BadgePlus } from "lucide-react";

interface Props {
  single: {
    product: Product;
    averageRating: number;
  };
}
const HeadingOfProduct: React.FC<Props> = ({ single }) => {
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(1);
  const [images, setImages] = useState<any>(null);

  const { addToCart } = useCartStore();

  const handleRatingChange = (e: React.FormEvent<HTMLInputElement>) => {
    const ratingValue = Number(e.currentTarget.value);
    setRating(ratingValue);
  };

  const handleImage = (img: string) => {
    setImages(img);
  };
  const handleSubmit = async () => {
    try {
      await axios.put(`/product/review/${single?.product?._id}`, {
        comment,
        rating,
      });

      toast.success("Review submitted successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:justify-between gap-x-7 gap-y-5 px-2 ">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:flex-2 flex-1 "
        >
          <div className="flex gap-x-2 sm:gap-x-2">
            <div className="flex flex-col items-center gap-y-2 ">
              {single?.product?.images?.map((item) => (
                <img
                  src={item}
                  className="w-[80px] h-[70px] object-cover cursor-pointer"
                  alt=""
                  onClick={() => handleImage(item)}
                />
              ))}
            </div>
            <div>
              <img
                src={images || single?.product?.images[0]}
                className="w-[400px] h-[300px] rounded-md object-cover"
                alt=""
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex-1 text-left w-full px-6 mt-2"
        >
          <div className="space-y-3">
            <h2 className="text-xl text-primary font-bold">
              {single?.product?.name}
            </h2>
            <p className="text-sm break-words text-secondary">
              {single?.product?.description}
            </p>
            <p className="text-secondary">$ 200</p>
          </div>

          <button
            className="btn mt-4 flex items-center gap-x-2 hover:btn-primary text-primary"
            onClick={() => addToCart(single?.product?._id)}
          >
            <BadgePlus />
            add to cart
          </button>

          <div className="flex flex-col gap-y-4 my-6">
            <div className="flex items-center justify-between">
              <div className="rating ">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    name="rating"
                    value={star}
                    className="mask mask-star-2 bg-orange-400"
                    checked={rating === star}
                    onChange={handleRatingChange}
                  />
                ))}
              </div>
              <span className=" font-bold text-secondary text-sm flex items-center gap-x-2">
                <p className="text-lg text-primary">
                  {Number(single.averageRating).toFixed(1)}
                </p>
                average Rating
              </span>
            </div>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Leave a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="btn btn-wide btn-success text-primary font-semibold"
                disabled={rating === 0}
              >
                Submit Rating
              </button>
            </div>
          </div>

          <button
            className="btn btn-accent  text-primary"
            onClick={() => {
              const modal = document.getElementById("my_modal_3");
              if (modal instanceof HTMLDialogElement) {
                modal.showModal();
              } else {
                console.warn(
                  "Modal with ID 'my_modal_3' is not an HTMLDialogElement or not found."
                );
              }
            }}
          >
            View Comments
          </button>

          <dialog id="my_modal_3" className="modal">
            <div className="modal-box overflow-y-auto">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost fixed right-2 top-2">
                  ✕
                </button>
              </form>
              <div>
                {single?.product?.reviews.length === 0 && (
                  <p className="text-center text-secondary font-bold ">
                    No comments yet.
                  </p>
                )}

                {single?.product?.reviews.map((item) => {
                  return (
                    <div className="border-b border-gray-600/10 p-2">
                      <div className="flex gap-x-2  ">
                        <img
                          src={item.user?.image || "/avatar.png"}
                          alt="user"
                          className="w-8 h/8 rounded-full"
                        />
                        <div className="flex flex-col gap-y-1">
                          <h3 className="text-md  font-semibold">
                            {item?.user?.name}
                          </h3>
                        </div>
                      </div>
                      <div className="mx-5 space-y-3 break-words text-secondary text-sm">
                        <p>Comment : {item.comment}</p>
                        <p className="text-xs text-primary">
                          Rating:{item.rating}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </dialog>
        </motion.div>
      </div>
    </>
  );
};

export default HeadingOfProduct;
