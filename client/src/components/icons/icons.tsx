import { Bug, Server, Globe, CircleHelp, Cloud, Cpu } from "lucide-react";

export const NoIcon = () => {
  return <CircleHelp className="mr-2 h-4 w-4" size={20} />;
};

export const WebIcon = () => {
  return <Globe color="#0099E6" className="mr-2 h-4 w-4" size={20} />;
};

export const ActiveDirectoryIcon = () => {
  return <Server color="white" className="mr-2 h-4 w-4" size={20} />;
};

export const CloudIcon = () => {
  return <Cloud color="white" className="mr-2 h-4 w-4" size={20} />;
};

export const HardwareIcon = () => {
  return <Cpu color="white" className="mr-2 h-4 w-4" size={20} />;
};

export const MalwareDeveloppmentIcon = () => {
  return <Bug color="red" className="mr-2 h-4 w-4" size={20} />;
};

export const RenderIcon = ({ icon }: { icon: Array<string> }): JSX.Element => {
  if (icon.includes("Malware Development")) {
    return <MalwareDeveloppmentIcon />;
  } else if (icon.includes("Active Directory")) {
    return <ActiveDirectoryIcon />;
  } else if (icon.includes("Web")) {
    return <WebIcon />;
  } else if (icon.includes("Cloud")) {
    return <CloudIcon />;
  } else if (icon.includes("Hardware")) {
    return <HardwareIcon />;
  }

  return <NoIcon />;
};
