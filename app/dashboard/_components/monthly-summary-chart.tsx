"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMilkRecords } from "@/context/MilkRecordContext";
import { calculatePricePerLiter } from "@/lib/utils";

// Допоміжна функція для отримання ключа у форматі MM/YYYY
const getMonthKey = (date: Date) => {
  return `${date.getMonth() + 1}/${date.getFullYear()}`;
};

const MonthlySummaryChart = () => {
  const { records } = useMilkRecords();

  // Групуємо дані по місяцях
  const summaryMap = new Map<string, { liters: number; profit: number }>();

  records.forEach((record) => {
    const date = new Date(record.date);
    const key = getMonthKey(date);

    const existing = summaryMap.get(key) || { liters: 0, profit: 0 };
    existing.liters += record.liters;
    existing.profit +=
      record.liters * calculatePricePerLiter(record.fat, record.price);

    summaryMap.set(key, existing);
  });

  // Перетворюємо в масив для графіка
  const chartData = Array.from(summaryMap.entries()).map(([month, data]) => ({
    month,
    liters: +data.liters.toFixed(2),
    profit: +data.profit.toFixed(2),
  }));

  return (
    <div className="w-full h-72 py-4 mt-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        Monthly Summary Chart
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="liters" fill="#3b82f6" name="Liters" />
          <Bar dataKey="profit" fill="#10b981" name="Incomes (₴)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySummaryChart;
