"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MilkRecord, useMilkRecords } from "@/context/MilkRecordContext";

const formSchema = z.object({
  date: z.preprocess(
    (val) => (val instanceof Date ? val.toISOString().split("T")[0] : val),
    z.string()
  ),
  liters: z.preprocess((val) => parseFloat(val as string), z.number().min(0.1)),
  fat: z.preprocess((val) => parseFloat(val as string), z.number().min(0.1)),
  price: z.preprocess((val) => parseFloat(val as string), z.number().min(0.1)),
});

interface EditRecordProps {
  record: MilkRecord;
  isOpen: boolean;
  onClose: () => void;
}

export const EditRecord: React.FC<EditRecordProps> = ({
  record,
  isOpen,
  onClose,
}) => {
  const { updateRecord } = useMilkRecords();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(record.date).toISOString().split("T")[0],
      liters: record.liters,
      fat: record.fat,
      price: record.price,
    },
  });

  useEffect(() => {
    reset({
      date: new Date(record.date).toISOString().split("T")[0],
      liters: record.liters,
      fat: record.fat,
      price: record.price,
    });
  }, [record, reset]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const updated: MilkRecord = {
      id: record.id,
      date: new Date(data.date),
      liters: data.liters,
      fat: parseFloat(data.fat.toFixed(1)),
      price: data.price,
    };
    await updateRecord(record.id, updated);

    onClose();
  };

  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 mx-4 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Record</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-4">
            <Input type="date" {...register("date")} disabled />
          </div>
          <div className="flex flex-col mb-4">
            <Input
              type="number"
              placeholder="Liters"
              step="0.1"
              {...register("liters", { valueAsNumber: true })}
            />
            {errors.liters && (
              <p className="text-red-500">{errors.liters.message}</p>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <Input
              type="number"
              placeholder="Fat %"
              step="0.1"
              {...register("fat", { valueAsNumber: true })}
            />
            {errors.fat && <p className="text-red-500">{errors.fat.message}</p>}
          </div>
          <div className="flex flex-col mb-4">
            <Input
              type="number"
              placeholder="Price"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
