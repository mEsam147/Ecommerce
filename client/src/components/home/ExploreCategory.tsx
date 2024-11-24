import React from 'react'
import {motion} from 'framer-motion'
import { categories } from '../../helper/Categories';
import { Link } from 'react-router-dom';
const ExploreCategory:React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto text-center mt-16">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className=" text-xl md:text-4xl text-secondary font-bold">
          Explore Our Categories{" "}
        </h1>
        <p className=" text-xs md:text-sm capitalize text-neutral ">
          Discover the latest trends in eco-friendly fashion
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-2 px-2  mt-10"
      >
        {categories.map((c, i) => {
          return (
            <Link to={`/category/${c.name}`} className="relative group" key={i}>
              <img
                src={c.image}
                className="relative w-full h-[200px] md:h-[250px] object-cover rounded-md group-hover:scale-105 transition-all duration-300 "
                alt=""
              />
              <div className="absolute bottom-4 left-3">
                <p className="text-lg text-slate-100 font-bold capitalize">
                  {c.name}
                </p>
                <p className="text-white text-sm capitalize"> {c.title}</p>
              </div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}

export default ExploreCategory
