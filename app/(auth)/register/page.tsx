"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterPage() {
  const [errSubmit, setErrSubmit] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/register", data);
      router.push("/login");
    } catch (err) {
      setErrSubmit("Registration failed");
      console.error("Registration failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-xs w-full"
    >
      <h1 className="text-2xl font-bold text-center">Register</h1>
      <div className="flex flex-col">
        <Input placeholder="Name" {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-[.8rem]">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <Input type="email" placeholder="Email" {...register("email")} />
        {errors.email && (
          <p className="text-red-500 text-[.8rem]">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-[.8rem]">{errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col items-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </div>
      {errSubmit && <p className="text-red-500 text-center">{errSubmit}</p>}
    </form>
  );
}
