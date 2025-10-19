import {
  Book,
  Brain,
  Bug,
  FileSpreadsheet,
  Globe,
  GraduationCap,
  Network,
  Shield,
  Video,
  Server,
  Key,
  Microscope,
  Radio,
  Terminal,
} from "lucide-react";
import React, { ElementType, JSX, ReactElement } from "react";
import { IconBrandWindows } from "@tabler/icons-react";
import { MdArticle } from "react-icons/md";

const MAP_TYPE_ICONS: Record<string, ElementType> = {
  Video: Video,
  Post: MdArticle,
  Course: GraduationCap,
  Website: Globe,
  Book: Book,
  Cheatsheet: FileSpreadsheet,
};

interface TypeIconProps {
  type: string;
}

export const TypeIcon = ({ type }: TypeIconProps): JSX.Element | null => {
  const IconComponent = MAP_TYPE_ICONS[type];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className="text-cyan-400 w-4 h-4 mr-1" />;
};

export const pathIconMappings: Record<
  string,
  { icon: ReactElement; color: string }
> = {
  "Active Directory": {
    icon: <Server className="w-6 h-6" />,
    color: "from-blue-500 via-blue-600 to-cyan-500",
  },
  Windows: {
    icon: <IconBrandWindows className="w-6 h-6" />,
    color: "from-sky-400 via-blue-500 to-indigo-500",
  },
  Web: {
    icon: <Globe className="w-6 h-6" />,
    color: "from-violet-500 via-purple-500 to-fuchsia-500",
  },
  "Network Security": {
    icon: <Network className="w-6 h-6" />,
    color: "from-emerald-500 via-green-500 to-teal-500",
  },
  "Malware Development": {
    icon: <Bug className="w-6 h-6" />,
    color: "from-rose-500 via-red-500 to-pink-500",
  },
  Cryptography: {
    icon: <Key className="w-6 h-6" />,
    color: "from-amber-500 via-orange-500 to-yellow-400",
  },
  "Digital Forensics": {
    icon: <Microscope className="w-6 h-6" />,
    color: "from-indigo-500 via-purple-500 to-violet-500",
  },
  "Artificial Intelligence": {
    icon: <Brain className="w-6 h-6" />,
    color: "from-yellow-400 via-amber-400 to-orange-400",
  },
  Wifi: {
    icon: <Radio className="w-6 h-6" />,
    color: "from-cyan-400 via-blue-500 to-indigo-500",
  },
  Linux: {
    icon: <Terminal className="w-6 h-6" />,
    color: "from-slate-400 via-gray-500 to-zinc-600",
  },
};

export const defaultPathIconStyle = {
  icon: <Shield className="w-6 h-6" />,
  color: "from-cyan-400 to-blue-400",
};
