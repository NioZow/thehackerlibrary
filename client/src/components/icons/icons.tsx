import {
  Bug,
  Server,
  Globe,
  CircleHelp,
  Cloud,
  Cpu,
  Check,
  Bookmark,
  Tv,
  Book,
  ShieldOff,
  Brain,
  Github,
} from "lucide-react";

export const NoIcon = () => {
  return (
    <div title="Unknown">
      <CircleHelp className="mr-2 h-4 w-4" size={20} />
    </div>
  );
};

export const WebIcon = () => {
  return (
    <div title="Web">
      <Globe color="#0099E6" className="mr-2 h-4 w-4" size={20} />
    </div>
  );
};

export const ActiveDirectoryIcon = () => {
  return (
    <div title="Active Directory">
      <Server color="white" className="mr-2 h-4 w-4" size={20} />
    </div>
  );
};

export const CloudIcon = () => {
  return (
    <div title="Cloud">
      <Cloud color="white" className="mr-2 h-4 w-4" size={20} />
    </div>
  );
};

export const HardwareIcon = () => {
  return (
    <div title="Hardware">
      <Cpu color="white" className="mr-2 h-4 w-4" size={20} />
    </div>
  );
};

export const MalwareDeveloppmentIcon = () => {
  return (
    <div title="Malware Development">
      <Bug color="red" className="mr-2 h-4 w-4" size={20} />
    </div>
  );
};

export const ReadIcon = () => {
  return (
    <div title="Read">
      <Check color="green" className="mr-2 h-4 w-4" size={20} />
    </div>
  );
};

export const BookmarkIcon = () => {
  return (
    <div title="Bookmarked">
      <Bookmark color="yellow" className="mr-2 h-4 w-4" size={20} />
    </div>
  );
};

export const VideoIcon = () => {
  return (
    <div title="Video">
      <Tv color="white" className="mr-2 h-4 w-4" size={20} />
    </div>
  );
};

export const BlogIcon = () => {
  return (
    <div title="Blogpost">
      <Book color="white" className="mr-2 h-4 w-4" size={20} />
    </div>
  );
};

export const InitialAccessIcon = () => {
  return (
    <div title="Initial Access">
      <ShieldOff color="white" className="mr-2 h-4 w-4" size={20} />
    </div>
  );
};

export const RepositoryIcon = () => {
  return (
    <div title="Repository">
      <Github color="white" className="mr-2 h-4 w-4" size={20} />
    </div>
  );
};

export const CheatsheetIcon = () => {
  return (
    <div title="Cheatsheet">
      <Brain color="white" className="mr-2 h-4 w-4" size={20} />
    </div>
  );
};

export const RenderIcon = ({
  tags,
  read,
  bookmarked,
  type,
}: {
  tags: Array<string>;
  read: boolean;
  bookmarked: boolean;
  type: string;
}): JSX.Element => {
  let icons: JSX.Element[] = [];

  // show type icons
  switch (type.toLowerCase()) {
    case "blogpost":
      icons.push(<BlogIcon />);
      break;
    case "video":
      icons.push(<VideoIcon />);
      break;
    case "cheatsheet":
      icons.push(<CheatsheetIcon />);
      break;
    default:
      icons.push(<NoIcon />);
  }

  if (tags.includes("Malware Development")) {
    icons.push(<MalwareDeveloppmentIcon />);
  } else if (tags.includes("Active Directory")) {
    icons.push(<ActiveDirectoryIcon />);
  } else if (tags.includes("Web")) {
    icons.push(<WebIcon />);
  } else if (
    tags.includes("Entra ID") ||
    tags.includes("AWS") ||
    tags.includes("GCP")
  ) {
    icons.push(<CloudIcon />);
  } else if (tags.includes("Initial Access")) {
    icons.push(<InitialAccessIcon />);
  } else if (tags.includes("Hardware")) {
    icons.push(<HardwareIcon />);
  } else {
    icons.push(<NoIcon />);
  }

  if (read) {
    icons.push(<ReadIcon />);
  }

  if (bookmarked) {
    icons.push(<BookmarkIcon />);
  }

  return <div className="flex">{icons}</div>;
};
