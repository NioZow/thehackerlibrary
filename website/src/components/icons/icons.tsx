import {
  IconBug,
  IconCloud,
  IconBrandWindows,
  IconBrandAzure,
  IconBrandAws,
  IconAccessPoint,
  IconWorldWww,
} from '@tabler/icons-react';
import { Cpu, Check, Bookmark, Tv, Book, ShieldOff, Brain, Github } from 'lucide-react';

import { isDefined } from '@/util/array';

import { TagResource } from '@/constant/types';

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
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
      <IconWorldWww color="#0099E6" className="mr-2 h-4 w-4" size={SIZE} />
    </div>
  );
};

export const ActiveDirectoryIcon = () => {
  return (
    <div title="Active Directory">
      <IconBrandWindows color="white" className="mr-2 h-4 w-4" size={SIZE} />
    </div>
  );
};

export const GcpIcon = () => {
  return (
    <div title="Google Cloud Platform">
      <IconCloud color="white" className="mr-2 h-4 w-4" size={SIZE} />
    </div>
  );
};

export const AzureIcon = () => {
  return (
    <div title="Azure">
      <IconBrandAzure color="#0099E6" className="mr-2 h-4 w-4" size={SIZE} />
    </div>
  );
};

export const AWSIcon = () => {
  return (
    <div title="Amazon Web Services">
      <IconBrandAws color="white" className="mr-2 h-4 w-4" size={SIZE} />
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
      <IconBug color="red" className="mr-2 h-4 w-4" size={SIZE} />
    </div>
  );
};

export const WifiIcon = () => {
  return (
    <div title="Wifi">
      <IconAccessPoint color="red" className="mr-2 h-4 w-4" size={SIZE} />
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

interface IProps {
  tags: TagResource[] | undefined;
}

const getIconFromName = (name?: string | null) => {
  switch (name) {
    case 'Malware Development':
      return MalwareDeveloppmentIcon;
    case 'Wifi':
      return WifiIcon;
    case 'Active Directory':
      return ActiveDirectoryIcon;
    case 'Web':
      return WebIcon;
    case 'Entra ID':
      return AzureIcon;
    case 'Azure':
      return AzureIcon;
    case 'AWS':
      return AWSIcon;
    case 'GCP':
      return GcpIcon;
    case 'Initial Access':
      return InitialAccessIcon;
    case 'Hardware':
      return HardwareIcon;
  }
};

export const RenderIcons = ({ tags }: IProps): JSX.Element => {
  const icons =
    tags
      ?.map(({ name }) => name)
      .map(getIconFromName)
      .filter(isDefined) ?? [];

  return <div className="flex">{icons.length ? icons.map((Icon, i) => <Icon key={i} />) : <NoIcon />}</div>;
};
