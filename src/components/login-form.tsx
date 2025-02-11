import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { fromImage } from "@/assets";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Eye, EyeOff, Lock } from "lucide-react";
import { loginFormSchema, TloginFormData } from "@/schemas";

export default function LoginForm() {
	const router = useNavigate();

	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<TloginFormData>({
		resolver: zodResolver(loginFormSchema),
	});

	const onSubmits = async (data: TloginFormData) => {
		await axios
			.post(`http://127.0.0.1:8000/api/login`, data)
			.then((response) => {
				if (response?.data?.success) {
					const { access_token, user } = response.data;
					if (user.role === "admin") {
						toast.success(response.data.success);
						Cookies.set("authToken", access_token, { expires: 1 });
						router(0);
					} else {
						toast.error("You do not have permission to access dashboard.");
					}
				}
			})
			.catch((err) => {
				if (err.response) {
					toast.error(err.response.data.error);
				}
			});
	};

	return (
		<motion.div
			initial={{ y: "115%" }}
			animate={{ y: "0%" }}
			transition={{ duration: 1, ease: "easeInOut" }}
			className="w-[70%] bg-[#201F41] py-5 rounded-lg">
			<div className="w-full flex justify-between items-center">
				<div className="w-1/2 pointer-events-none pl-5">
					<img
						src={fromImage}
						alt="fromImage"
						className="w-full object-cover rounded-lg"
					/>
				</div>
				<div className="w-1/2 flex items-center justify-center">
					<div className="w-full px-10 flex justify-center flex-col gap-8">
						<div className="flex flex-col gap-4">
							<h1 className="text-[40px] text-white font-medium leading-tight tracking-tight">
								Welcome back
							</h1>
							<div className="flex items-center gap-2">
								<button className="text-sm text-[#ADABB8] font-normal leading-tight tracking-tight">
									LogIn to continue to Dashboard
								</button>
							</div>
						</div>
						<form
							onSubmit={handleSubmit(onSubmits)}
							className="flex flex-col gap-5">
							<div className="flex flex-col gap-5">
								<div className="flex flex-col gap-2">
									<div className="w-full flex items-center bg-[#3c375269] rounded-lg p-4 focus-within:border-[#3920BA] focus-within:border-[1px] focus-within:ring-1">
										<AtSign className="text-[#6D6980] mr-3" />
										<input
											type="email"
											{...register("email")}
											placeholder="Email"
											className={`bg-transparent text-white placeholder:text-[#6D6980] focus:outline-none outline-none w-full ${
												errors.email && "border-red-500 border-[1px]"
											}`}
										/>
									</div>
									{errors.email && (
										<span className="text-red-500 text-sm">
											{errors.email.message}
										</span>
									)}
								</div>
								<div className="flex flex-col gap-2">
									<div className="w-full flex items-center bg-[#3c375269] rounded-lg p-4 focus-within:border-[#3920BA] focus-within:border-[1px] focus-within:ring-1">
										<Lock className="text-[#6D6980] mr-3" />
										<input
											type={showPassword ? "text" : "password"}
											{...register("password")}
											placeholder="Enter your password"
											className={`bg-transparent text-white placeholder:text-[#6D6980] focus:outline-none outline-none w-full ${
												errors.password && "border-red-500 border-[1px]"
											}`}
										/>
										{errors.password && (
											<span className="text-red-500 text-sm">
												{errors.password.message}
											</span>
										)}
										<button
											type="button"
											onClick={togglePasswordVisibility}
											className="ml-2">
											{showPassword ? (
												<EyeOff className="text-[#6D6980]" />
											) : (
												<Eye className="text-[#6D6980]" />
											)}
										</button>
									</div>
								</div>
							</div>
							<input
								type="submit"
								value={`${isSubmitting ? "Loading..." : "Log In"}`}
								className="w-full bg-[#3920BA] rounded-lg p-4 text-[16px] text-white font-normal text-center leading-tight tracking-tight cursor-pointer"
								disabled={isSubmitting}
							/>
						</form>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
