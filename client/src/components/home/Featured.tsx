import React, { useCallback, useMemo, useRef, useState } from "react";
import { useProductStore } from "../../store/useProductStore";
import ProductCard from "../ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const isFeatured: React.FC = () => {
  const [onSlider, setOnSlider] = useState<boolean>(false);
  const { products } = useProductStore();
  const featuredProducts = useMemo(
    () => products.filter((item) => item.isFeatured).slice(0, 8),
    [products]
  );

  const sliderRef = useRef<HTMLDivElement>(null);

  const handleSliderLeft = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }, [sliderRef]);

  const handleSliderRight = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }, [sliderRef]);
  return (
    <div className="max-w-5xl mx-auto my-10 ">
      {featuredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl text-secondary font-bold my-10"
        >
          Oops! There are currently no products marked as featured
        </motion.div>
      )}
      {featuredProducts.length > 0 && (
        <>
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-left my-10 text-primary uppercase"
          >
            Featured Products
          </motion.h2>

          <motion.div
            className="relative flex items-center"
            onMouseEnter={() => setOnSlider(true)}
            onMouseLeave={() => setOnSlider(false)}
          >
            {onSlider && (
              <motion.span
                transition={{ duration: 0.2 }}
                className="absolute top-1/2 -translate-y-1/2 z-30 cursor-pointer left-6 bg-secondary w-10 h-10 rounded-full flex items-center justify-center text-primary group hover:bg-secondary/80 "
                onClick={handleSliderLeft}
              >
                <ChevronLeft
                  size={25}
                  className="group-hover:-translate-x-0.5 transition-all duration-150"
                />
              </motion.span>
            )}

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex gap-4 overflow-hidden"
            >
              <div
                className="flex transition-transform duration-300 overflow-x-scroll no-scrollbar"
                ref={sliderRef}
              >
                {featuredProducts.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`${
                      featuredProducts.length <= 2
                        ? "flex-grow w-full"
                        : "flex-shrink-0 w-full sm:w-1/2 md:w-1/3"
                    } p-2`}
                  >
                    <ProductCard item={item} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {onSlider && (
              <motion.span
                className="absolute top-1/2 -translate-y-1/2 z-30 cursor-pointer right-6 bg-secondary w-10 h-10 rounded-full flex items-center justify-center text-primary group hover:bg-secondary/80"
                onClick={handleSliderRight}
              >
                <ChevronRight
                  size={25}
                  className="group-hover:translate-x-0.5 transition-all duration-150"
                />
              </motion.span>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default isFeatured;
