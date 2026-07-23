import {
  MapPin,
  GraduationCap,
  Route,
  Target,
  Compass,
  Sparkles,
  UserRound,
  Bike,
  Video,
  Cpu,
  HardDrive,
  Coffee,
  Dumbbell,
  PenTool,
  Wand2,
  Boxes,
  Workflow,
  MonitorSmartphone,
  Mail,
  Github,
  Instagram,
  Youtube,
  Linkedin,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/types";

// 對照表：把 data 內的 IconName 字串轉成實際的 Lucide 元件
// 要新增圖示：先在 types/index.ts 的 IconName 加入名稱，再到這裡補上對應
const iconMap: Record<IconName, LucideIcon> = {
  MapPin,
  GraduationCap,
  Route,
  Target,
  Compass,
  Sparkles,
  UserRound,
  Bike,
  Video,
  Cpu,
  HardDrive,
  Coffee,
  Dumbbell,
  PenTool,
  Wand2,
  Boxes,
  Workflow,
  MonitorSmartphone,
  Mail,
  Github,
  Instagram,
  Youtube,
  Linkedin,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
};

interface IconProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, className, strokeWidth = 1.5 }: IconProps) {
  const LucideComponent = iconMap[name];
  return <LucideComponent className={className} strokeWidth={strokeWidth} />;
}
