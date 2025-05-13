"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMilkRecords } from "@/context/MilkRecordContext";

const formSchema = z.object({
  date: z.string().nonempty("Date is required"),
  liters: z.number().min(0, "Liters must be a positive number"),
  fat: z.number().min(0, "Fat must be a positive number"),
  price: z.number().min(0, "Price must be a positive number"),
});

interface AddRecordProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddRecord: React.FC<AddRecordProps> = ({ isOpen, onClose }) => {
  const { addRecord } = useMilkRecords();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await addRecord({
      ...data,
      fat: data.fat,
      price: data.price,
      liters: data.liters,
      date: new Date(data.date),
    });
    reset();
    onClose();
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6  mx-4">
        <h2 className="text-xl font-semibold mb-4">Add Record</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-4">
            <Input type="date" {...register("date")} />
            {errors.date && (
              <p className="text-red-500 text-[.8rem]">{errors.date.message}</p>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <Input
              type="number"
              placeholder="liters"
              step="0.1"
              {...register("liters", { valueAsNumber: true })}
            />
            {errors.liters && (
              <p className="text-red-500 text-[.8rem]">
                {errors.liters.message}
              </p>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <Input
              type="number"
              placeholder="fat"
              step="0.1"
              {...register("fat", { valueAsNumber: true })}
            />
            {errors.fat && (
              <p className="text-red-500 text-[.8rem]">{errors.fat.message}</p>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <Input
              type="number"
              placeholder="price"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-red-500 text-[.8rem]">
                {errors.price.message}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2 items-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              {isSubmitting ? "Adding..." : "Add Record"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
