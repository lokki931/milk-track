import { MilkRecord } from "@/context/MilkRecordContext";

export async function fetchAllRecords(): Promise<MilkRecord[]> {
  const res = await fetch("/api/entries");
  if (!res.ok) throw new Error("Failed to fetch records");
  return res.json();
}

export async function createRecord(
  entry: Omit<MilkRecord, "id">
): Promise<MilkRecord> {
  const res = await fetch("/api/entries", {
    method: "POST",
    body: JSON.stringify(entry),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to create record");
  return res.json();
}

export async function updateRecordById(
  id: string,
  updated: MilkRecord
): Promise<MilkRecord> {
  const res = await fetch(`/api/entries/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });
  if (!res.ok) throw new Error("Failed to update record");
  return res.json();
}

export async function deleteRecordById(id: string): Promise<void> {
  const res = await fetch(`/api/entries/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete record");
}
