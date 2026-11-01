import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type BarChartItem = {
  label: string;
  value: number;
  color?: string;
};

type BarChartProps = {
  items: BarChartItem[];
  height?: number;
  animateOnMount?: boolean;
};

export const BarChart: React.FC<BarChartProps> = ({
  items,
  height = 200,
  animateOnMount = true,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (animateOnMount) {
      setMounted(true);
    }
  }, []);

  const barHeights = items.map((item, index) => {
    const maxValue = Math.max(...items.map((i) => i.value));
    const percentage = item.value / maxValue;
    return Math.round((percentage * (height - 40)) + 20);
  });

  return (
    <div className="relative w-full rounded-lg bg-card p-4">
      <div className="relative h-64 bg-muted/30 rounded-lg overflow-hidden">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            whileHover={{ scale: 1.02 }}
            className="relative flex items-end mb-2"
            style={{ height: `${barHeights[index]}px` }}
          >
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-px bg-primary"
              style={{ height: `${barHeights[index]}px` }}
            />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-primary">
              {item.label}
            </div>
            <motion.span
              className="absolute bottom-full left-1/2 -translate-x-1/2 text-xs text-muted-foreground"
              animate={{ y: [barHeights[index] + 10, barHeights[index]] }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item.value}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
};