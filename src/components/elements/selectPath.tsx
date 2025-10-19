import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { Route } from "lucide-react";
import { Path } from "@/types/prisma";

interface IProps {
  path: Path | null;
  paths: Path[];
  storageName: string;
  page: string;
}

export function SelectPath({ paths, path, storageName, page }: IProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(path?.name);

  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          aria-expanded={open}
        >
          <Route className="w-4 h-4" />
          <span>
            {value ? paths.find((path) => path.name === value)?.name : "Path"}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search path..." className="h-9" />
          <CommandList>
            <CommandEmpty>No path found.</CommandEmpty>
            <CommandGroup>
              {paths.map((path) => (
                <CommandItem
                  key={path.id}
                  value={path.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);

                    if (currentValue === value) {
                      delete localStorage[storageName];
                      router.push(`/${page}`);
                    } else {
                      localStorage.setItem(storageName, path.id.toString());
                      router.push(`/${page}?path=${path.id}`);
                    }
                  }}
                >
                  {path.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === path.name ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
