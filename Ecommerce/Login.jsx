import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, LogIn, Loader } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Add your login logic here (API call)
        setLoading(true);
    };

    return (
        <motion.div
            className="flex items-center justify-center min-h-screen bg-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-emerald-400 mb-6 text-center">Login to Your Account</h2>
                <form onSubmit={handleLogin} className="space-y-4">
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
                    <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? <Loader className="animate-spin" size={20} /> : <LogIn size={20} />}
                        <span className="ml-2">{loading ? "Logging In..." : "Log In"}</span>
                    </button>
                </form>
                <p className="text-gray-400 mt-4 text-center">
                    Dont have an account?{" "}
                    <Link to="/signup" className="text-emerald-400 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default Login;
