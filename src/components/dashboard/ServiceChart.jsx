import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import EmptyState from "../common/EmptyState.jsx";

export default function ServiceChart({ data }) {
  if (!data || data.length === 0) {
    return <EmptyState title="No service data" message="Lead/service distribution will appear once leads exist." />;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
        <CartesianGrid stroke="#E2E8E5" vertical={false} />
        <XAxis
          dataKey="service"
          tick={{ fill: "#53615D", fontSize: 12 }}
          axisLine={{ stroke: "#E2E8E5" }}
          tickLine={false}
        />
        <YAxis tick={{ fill: "#53615D", fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            border: "1px solid #E2E8E5",
            fontSize: 13,
          }}
        />
        <Bar dataKey="count" fill="#0B6B57" radius={[4, 4, 0, 0]} maxBarSize={36} />
      </BarChart>
    </ResponsiveContainer>
  );
}
