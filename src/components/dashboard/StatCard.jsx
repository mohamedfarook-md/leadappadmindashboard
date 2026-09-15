import { formatNumber, formatPercent } from "../../utils/formatters";

export default function StatCard({ title, value, supportingText, icon, trend }) {
  const trendPositive = typeof trend === "number" && trend >= 0;
  const trendNegative = typeof trend === "number" && trend < 0;

  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span className="stat-card-icon">{icon}</span>
        {typeof trend === "number" && (
          <span className={`stat-card-trend ${trendPositive ? "trend-up" : ""} ${trendNegative ? "trend-down" : ""}`}>
            {trendPositive ? "▲" : "▼"} {formatPercent(Math.abs(trend))}
          </span>
        )}
      </div>
      <div className="stat-card-value">{formatNumber(value)}</div>
      <div className="stat-card-title">{title}</div>
      {supportingText && <div className="stat-card-support">{supportingText}</div>}
    </div>
  );
}
