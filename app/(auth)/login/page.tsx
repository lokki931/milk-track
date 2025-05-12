"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginForm() {
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
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.ok) router.push("/dashboard");
    else setErrSubmit("Invalid credentials");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-xs w-full p-4 rounded-b-md shadow-md"
    >
      <h1 className="text-2xl font-bold text-center">Login</h1>
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
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </div>
      {errSubmit && <p className="text-red-500 text-center">{errSubmit}</p>}
    </form>
  );
}
