import { useState } from "react";
import { Link } from "react-router-dom";
import {  Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";


const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
   

    const handleInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        // Add your signup logic here (API call)
        setLoading(true);
    };

    return (
        <motion.div
            className="flex items-center justify-center min-h-screen bg-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-emerald-400 mb-6 text-center">Create Your Account</h2>
                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="flex items-center border-b border-gray-600 py-2">
                        <User className="mr-3 text-emerald-400" size={20} />
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                            className="w-full bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="flex items-center border-b border-gray-600 py-2">
                        <Mail className="mr-3 text-emerald-400" size={20} />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="w-full bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="flex items-center border-b border-gray-600 py-2">
                        <Lock className="mr-3 text-emerald-400" size={20} />
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className="w-full bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="flex items-center border-b border-gray-600 py-2">
                        <Lock className="mr-3 text-emerald-400" size={20} />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm Password"
                            className="w-full bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? <Loader className="animate-spin" size={20} /> : <ArrowRight size={20} />}
                        <span className="ml-2">{loading ? "Signing Up..." : "Sign Up"}</span>
                    </button>
                </form>
                <p className="text-gray-400 mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-emerald-400 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default Signup;
