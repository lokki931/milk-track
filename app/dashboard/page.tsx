"use client";

import { useSession } from "next-auth/react";
import { Droplets, Percent, Wallet, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MilkRecord, useMilkRecords } from "@/context/MilkRecordContext";
import { AddRecord } from "./_components/add-record";
import { EditRecord } from "./_components/edit-record";
import Pagination from "./_components/pagination";
import RangeFilter from "./_components/select-range";
import { StatCard } from "./_components/stat-card";

const ITEMS_PER_PAGE = 7;

export default function DashboardPage() {
  const now = new Date();
  const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
  const currentYear = String(now.getFullYear());

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const { records, deleteRecord } = useMilkRecords();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<
    "full" | "firstHalf" | "secondHalf"
  >("full");
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    record: MilkRecord | null;
  }>({
    isOpen: false,
    record: null,
  });

  const [page, setPage] = useState(1);

  const months = useMemo(
    () => [
      { value: "01", label: "January" },
      { value: "02", label: "February" },
      { value: "03", label: "March" },
      { value: "04", label: "April" },
      { value: "05", label: "May" },
      { value: "06", label: "June" },
      { value: "07", label: "July" },
      { value: "08", label: "August" },
      { value: "09", label: "September" },
      { value: "10", label: "October" },
      { value: "11", label: "November" },
      { value: "12", label: "December" },
    ],
    []
  );

  const years = Array.from(
    new Set(records.map((r) => new Date(r.date).toISOString().split("-")[0]))
  ).sort();
  useEffect(() => {
    if (selectedMonth === "" && months.some((m) => m.value === currentMonth)) {
      setSelectedMonth(currentMonth);
    }

    if (selectedYear === "" && years.includes(currentYear)) {
      setSelectedYear(currentYear);
    }
  }, [months, years, selectedMonth, selectedYear, currentMonth, currentYear]);

  const filteredData = records.filter((record) =>
    selectedMonth && selectedYear
      ? new Date(record.date)
          .toISOString()
          .startsWith(`${selectedYear}-${selectedMonth}`)
      : false
  );
  const rangeFilteredData = filteredData.filter((record) => {
    const day = parseInt(new Date(record.date).toISOString().split("-")[2]);
    if (selectedRange === "firstHalf") return day >= 1 && day <= 15;
    if (selectedRange === "secondHalf") return day >= 16 && day <= 31;
    return true; // full month
  });

  const paginated = rangeFilteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(rangeFilteredData.length / ITEMS_PER_PAGE);

  function calculatePricePerLiter(fat: number, basePrice: number) {
    if (fat < 3.5) return basePrice;
    const baseFat = 3.5;
    const bonusPerPoint = 0.3;

    const fatDifference = fat - baseFat;
    const price = basePrice + (fatDifference / 0.1) * bonusPerPoint;

    return Number(price.toFixed(2));
  }

  const totalIncome = rangeFilteredData.reduce(
    (sum, r) => sum + r.liters * calculatePricePerLiter(Number(r.fat), r.price),
    0
  );

  const totalLiters = rangeFilteredData
    .reduce((sum, r) => sum + r.liters, 0)
    .toFixed(2);
  const avgFat =
    rangeFilteredData.length > 0
      ? (
          rangeFilteredData.reduce((sum, r) => sum + Number(r.fat), 0) /
          rangeFilteredData.length
        ).toFixed(1)
      : "0.0";
  const estimatedIncome = totalIncome.toFixed(2);

  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Welcome back, {session.user.name}!
      </h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard
          icon={<Droplets className="text-blue-600 w-6 h-6" />}
          title="Milk Collected"
          value={`${totalLiters} L`}
        />
        <StatCard
          icon={<Percent className="text-yellow-600 w-6 h-6" />}
          title="Avg. Fat %"
          value={`${avgFat}%`}
        />
        <StatCard
          icon={<Wallet className="text-green-600 w-6 h-6" />}
          title="Estimated Income"
          value={`₴${estimatedIncome}`}
        />
      </div>

      {/* Header + Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Daily Records</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition text-sm"
        >
          <Plus size={16} />
          Add Record
        </button>
      </div>
      <div className="flex justify-end mb-4 gap-2">
        {/* Month Select */}
        <select
          value={selectedMonth}
          onChange={(e) => {
            setSelectedMonth(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="" disabled>
            Select Month
          </option>
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        {/* Year Select */}
        <select
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="" disabled>
            Select Year
          </option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {rangeFilteredData.length === 0 ? (
        <div className="text-center text-gray-500 py-10 border border-gray-200 rounded-xl">
          No records found for the selected month and year.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Liters</th>
                <th className="px-4 py-3">Fat %</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Income</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((record) => (
                <tr key={record.id} className="border-t">
                  <td className="px-4 py-3">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {record.liters} L
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{record.fat}%</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    ₴{record.price}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    ₴
                    {(
                      record.liters *
                      calculatePricePerLiter(Number(record.fat), record.price)
                    ).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap flex justify-center gap-4 text-sm">
                    <button
                      onClick={() => setEditModal({ isOpen: true, record })}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        const confirmed = confirm(
                          "Are you sure you want to delete this record?"
                        );
                        if (confirmed) {
                          deleteRecord(record.id);
                        }
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {rangeFilteredData.length > ITEMS_PER_PAGE && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
      {/* Filter by half month */}
      <RangeFilter
        selectedRange={selectedRange}
        onRangeChange={(newRange) => setSelectedRange(newRange)}
      />
      {/* {Total income} */}
      <p className="mb-4 text-gray-700 font-medium text-right">
        Total income:{" "}
        <span className="text-green-700 font-semibold">
          ₴{totalIncome.toFixed(2)}
        </span>
      </p>
      {/* Add Record Modal */}
      {isModalOpen && (
        <AddRecord isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
      {/* Edit Record Modal */}

      {editModal.isOpen && editModal.record && (
        <EditRecord
          isOpen={editModal.isOpen}
          onClose={() => setEditModal({ isOpen: false, record: null })}
          record={editModal.record}
        />
      )}
    </div>
  );
}
