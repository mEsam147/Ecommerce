import React, { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Loader, MoveRight, UserPlus } from "lucide-react";
import { useUserStore } from "../store/useUserStore";

interface Login {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const initialFormData: Login = {
    email: "",
    password: "",
  };

  const { login, loading } = useUserStore();

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    login({ ...formData });
  };
  return (
    <div className="max-w-5xl min-h-[70vh] mx-auto ">
      <div className=" w-full mt-14">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0 }}
          className="text-primary text-2xl font-bold text-center"
        >
          Login Now
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0 }}
          className="sm:w-1/2 mx-4  sm:mx-auto mt-10 bg-secondary/5 rounded-md py-14 px-8 sm:px-4"
        >
          <form
            className="flex justify-center gap-y-3 flex-col"
            onSubmit={handleSubmit}
          >
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>

            <button
              type="submit"
              className="btn btn-secondary text-primary flex items-center gap-x-
            3 uppercase"
              disabled={loading}
            >
              {loading ? (
                <Loader className="size-5 animate-spin" />
              ) : (
                <span className=" flex items-center gap-x-1">
                  <UserPlus className="size-5" />
                  Login
                </span>
              )}
            </button>
          </form>
          <div className="flex flex-col sm:flex-row items-center gap-2 py-4 mx-auto justify-center">
            <span className="text-secondary ">Create Your Account ?</span>
            <Link
              to="/register"
              className="text-primary hover:text-secondary flex items-center gap-x-4 group"
            >
              Sign up here
              <MoveRight className="group-hover:translate-x-2 text-sm transition-all duration-150" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
