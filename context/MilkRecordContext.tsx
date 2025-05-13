"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type MilkRecord = {
  id: string;
  date: Date;
  liters: number;
  fat: number;
  price: number;
};

interface MilkRecordContextType {
  records: MilkRecord[];
  setRecords: React.Dispatch<React.SetStateAction<MilkRecord[]>>;
  fetchRecords: () => Promise<void>;
  addRecord: (entry: Omit<MilkRecord, "id">) => Promise<void>;
  deleteRecord: (id: string) => Promise<void>;
}

const MilkRecordContext = createContext<MilkRecordContextType | undefined>(
  undefined
);

export const MilkRecordProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [records, setRecords] = useState<MilkRecord[]>([]);

  const fetchRecords = async () => {
    const res = await fetch("/api/entries");
    const data = await res.json();
    setRecords(data);
  };

  const addRecord = async (entry: Omit<MilkRecord, "id">) => {
    const res = await fetch("/api/entries", {
      method: "POST",
      body: JSON.stringify(entry),
      headers: { "Content-Type": "application/json" },
    });
    const newEntry = await res.json();
    setRecords((prev) => [...prev, newEntry]);
  };
  const deleteRecord = async (id: string) => {
    try {
      await fetch(`/api/entries/${id}`, {
        method: "DELETE",
      });

      // Видаляємо зі стейту після успішного видалення з бекенду
      setRecords((prev) => prev.filter((record) => record.id !== id));
    } catch (error) {
      console.error("Failed to delete record:", error);
    }
  };
  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <MilkRecordContext.Provider
      value={{ records, setRecords, fetchRecords, addRecord, deleteRecord }}
    >
      {children}
    </MilkRecordContext.Provider>
  );
};

export const useMilkRecords = () => {
  const context = useContext(MilkRecordContext);
  if (!context)
    throw new Error("useMilkRecords must be used within MilkRecordProvider");
  return context;
};
