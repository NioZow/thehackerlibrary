import { Bug, Server, Globe, Cloud, Cpu, Check, Bookmark, Tv, Book, ShieldOff, Brain, Github } from 'lucide-react';

const SIZE: number = 24;

export const NoIcon = () => {
  return (
    <div title="Unknown">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={SIZE}
        height={SIZE}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-circle-help h-4 w-4 mr-2"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
    </div>
  );
};

export const WebIcon = () => {
  return (
    <div title="Web">
      <Globe color="#0099E6" className="mr-2 h-4 w-4" size={SIZE} />
    </div>
  );
};

export const ActiveDirectoryIcon = () => {
  return (
    <div title="Active Directory">
      <Server color="white" className="mr-2 h-4 w-4" size={SIZE} />
    </div>
  );
};

export const CloudIcon = () => {
  return (
    <div title="Cloud">
      <Cloud color="white" className="mr-2 h-4 w-4" size={SIZE} />
    </div>
  );
};

export const HardwareIcon = () => {
  return (
    <div title="Hardware">
      <Cpu color="white" className="mr-2 h-4 w-4" size={SIZE} />
    </div>
  );
};

export const MalwareDeveloppmentIcon = () => {
  return (
    <div title="Malware Development">
      <Bug color="red" className="mr-2 h-4 w-4" size={SIZE} />
    </div>
  );
};

export const ReadIcon = () => {
  return (
    <div title="Read">
      <Check color="green" className="mr-2 h-4 w-4" size={SIZE} />
    </div>
  );
};

export const BookmarkIcon = () => {
  return (
    <div title="Bookmarked">
      <Bookmark color="yellow" className="mr-2 h-4 w-4" size={SIZE} />
    </div>
  );
};

export const VideoIcon = () => {
  return (
    <div title="Video">
      <Tv color="white" className="mr-2 h-4 w-4" size={SIZE} />
    </div>
  );
};

export const BlogIcon = () => {
  return (
    <div title="Blogpost">
      <Book color="white" className="mr-2 h-4 w-4" size={SIZE} />
    </div>
  );
};

export const InitialAccessIcon = () => {
  return (
    <div title="Initial Access">
      <ShieldOff color="white" className="mr-2 h-4 w-4" size={SIZE} />
    </div>
  );
};

export const RepositoryIcon = () => {
  return (
    <div title="Repository">
      <Github color="white" className="mr-2 h-4 w-4" size={SIZE} />
    </div>
  );
};

export const CheatsheetIcon = () => {
  return (
    <div title="Cheatsheet">
      <Brain color="white" className="mr-2 h-4 w-4" size={SIZE} />
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
  const icons: JSX.Element[] = [];

  // show type icons
  switch (type.toLowerCase()) {
    case 'blogpost':
      icons.push(<BlogIcon />);
      break;
    case 'video':
      icons.push(<VideoIcon />);
      break;
    case 'cheatsheet':
      icons.push(<CheatsheetIcon />);
      break;
    default:
      icons.push(<NoIcon />);
  }

  if (tags.includes('Malware Development')) {
    icons.push(<MalwareDeveloppmentIcon />);
  } else if (tags.includes('Active Directory')) {
    icons.push(<ActiveDirectoryIcon />);
  } else if (tags.includes('Web')) {
    icons.push(<WebIcon />);
  } else if (tags.includes('Entra ID') || tags.includes('AWS') || tags.includes('GCP')) {
    icons.push(<CloudIcon />);
  } else if (tags.includes('Initial Access')) {
    icons.push(<InitialAccessIcon />);
  } else if (tags.includes('Hardware')) {
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
