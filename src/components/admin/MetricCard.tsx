import { type LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  color?: "violet" | "fuchsia" | "green" | "orange";
}

const colorMap = {
  violet: {
    bg: "from-[#8a2be2]/20 to-[#8a2be2]/5",
    border: "border-[#8a2be2]/30",
    icon: "text-[#8a2be2]",
    iconBg: "bg-[#8a2be2]/20",
  },
  fuchsia: {
    bg: "from-[#ff00ff]/20 to-[#ff00ff]/5",
    border: "border-[#ff00ff]/30",
    icon: "text-[#ff00ff]",
    iconBg: "bg-[#ff00ff]/20",
  },
  green: {
    bg: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/30",
    icon: "text-emerald-400",
    iconBg: "bg-emerald-500/20",
  },
  orange: {
    bg: "from-orange-500/20 to-orange-500/5",
    border: "border-orange-500/30",
    icon: "text-orange-400",
    iconBg: "bg-orange-500/20",
  },
};

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "violet",
}: MetricCardProps) {
  const colors = colorMap[color];

  return (
    <div
      className={`bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-2xl p-5 backdrop-blur-sm`}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-xl ${colors.iconBg} flex items-center justify-center`}
        >
          <Icon size={20} className={colors.icon} />
        </div>
        {trend && (
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              trend.value >= 0
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {trend.value >= 0 ? "+" : ""}
            {trend.value}% {trend.label}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-400 mt-1">{title}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  );
}
