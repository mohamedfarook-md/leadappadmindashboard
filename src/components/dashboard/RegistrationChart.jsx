import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import EmptyState from "../common/EmptyState.jsx";
import { formatDate } from "../../utils/formatters";

export default function RegistrationChart({ data }) {
  if (!data || data.length === 0) {
    return <EmptyState title="No registration data" message="Registration trends will appear once users sign up." />;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
        <CartesianGrid stroke="#E2E8E5" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={(v) => formatDate(v, { day: "2-digit", month: "short", year: undefined })}
          tick={{ fill: "#53615D", fontSize: 12 }}
          axisLine={{ stroke: "#E2E8E5" }}
          tickLine={false}
        />
        <YAxis tick={{ fill: "#53615D", fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip
          labelFormatter={(v) => formatDate(v)}
          contentStyle={{ borderRadius: 8, border: "1px solid #E2E8E5", fontSize: 13 }}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#0B6B57"
          strokeWidth={2.2}
          dot={{ r: 2.5, fill: "#0B6B57" }}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
