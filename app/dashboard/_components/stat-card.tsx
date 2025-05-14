export function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        {icon}
        <span>{title}</span>
      </div>
      <div className="text-2xl font-semibold text-gray-800">{value}</div>
    </div>
  );
}
