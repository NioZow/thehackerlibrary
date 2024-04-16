import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDownIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import { useState } from "react";

interface Props {
  columns: Record<string, boolean>;
  setColumns: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  buttonName: string;
}

const CustomDropdownMenu = ({ columns, setColumns, buttonName }: Props) => {
  const [openColumn, setColumnOpen] = useState(false);
  const [dropboxHumanClosed, setDropboxHumanClosed] = useState(false);

  return (
    <DropdownMenu
      onOpenChange={() => {
        if (!dropboxHumanClosed) {
          setColumnOpen(true);
        } else {
          setDropboxHumanClosed(false);
        }
      }}
      open={openColumn}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          {buttonName} <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onInteractOutside={() => {
          setColumnOpen(false);
          setDropboxHumanClosed(true);
        }}
        onEscapeKeyDown={() => {
          setColumnOpen(false);
          setDropboxHumanClosed(true);
        }}
      >
        {Object.entries(columns).map(([column, value]) => {
          return column !== "" && column !== "Actions" ? (
            <DropdownMenuCheckboxItem
              className="capitalize"
              checked={value}
              key={column}
              onCheckedChange={() => {
                setColumns((prevState) => ({
                  ...prevState, // Copy the previous state
                  [column]: !prevState[column], // Toggle the value of the specified key
                }));
              }}
            >
              {column}
            </DropdownMenuCheckboxItem>
          ) : null;
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomDropdownMenu;
