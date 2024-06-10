import { useState } from 'react';

import { Button } from '@/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { ChevronDownIcon, DotIcon } from '@radix-ui/react-icons';

interface IPropsSingle<T> {
  elements: T[];
  currentElement: T;
  setCurrentElement: React.Dispatch<React.SetStateAction<T>>;
  buttonName: string;
}

interface IPropsMultiple<T> {
  elements: T[];
  currentElements: T[];
  setCurrentElements: React.Dispatch<React.SetStateAction<T[]>>;
  buttonName: string;
}

export function DropdownMenuSingle<T>({ elements, currentElement, setCurrentElement, buttonName }: IPropsSingle<T>) {
  const [openColumn, setColumnOpen] = useState(false);
  const [itemClicked, setItemClicked] = useState(false);

  return (
    <DropdownMenu
      onOpenChange={() => {
        if (itemClicked) {
          setColumnOpen(true);
          setItemClicked(false);
        } else {
          if (openColumn) {
            setColumnOpen(false);
          } else {
            setColumnOpen(true);
          }
        }
      }}
      open={openColumn}
    >
      <DropdownMenuTrigger asChild>
        <Button className="ml-auto w-[200px]">
          {(buttonName as string).toUpperCase()}
          <DotIcon className="ml-2 h-4 w-4" />
          {(currentElement as string).toUpperCase()}
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onInteractOutside={() => {
          setColumnOpen(false);
        }}
        onEscapeKeyDown={() => {
          setColumnOpen(false);
        }}
      >
        {elements.map((value) => {
          return (
            <DropdownMenuCheckboxItem
              checked={value === currentElement}
              key={value as string}
              onCheckedChange={() => {
                setCurrentElement(value);
                setItemClicked(true);
              }}
              className="w-[200px]"
            >
              {(value as string).toUpperCase()}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DropdownMenuMultiple<T>({
  elements,
  currentElements,
  setCurrentElements,
  buttonName,
}: IPropsMultiple<T>) {
  const [openColumn, setColumnOpen] = useState(false);
  const [itemClicked, setItemClicked] = useState(false);

  return (
    <DropdownMenu
      onOpenChange={() => {
        if (itemClicked) {
          setColumnOpen(true);
          setItemClicked(false);
        } else {
          if (openColumn) {
            setColumnOpen(false);
          } else {
            setColumnOpen(true);
          }
        }
      }}
      open={openColumn}
    >
      <DropdownMenuTrigger asChild>
        <Button className="ml-auto w-[200px]">
          {(buttonName as string).toUpperCase()}
          <DotIcon className="ml-2 h-4 w-4" />
          {currentElements.length as number}
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onInteractOutside={() => {
          setColumnOpen(false);
        }}
        onEscapeKeyDown={() => {
          setColumnOpen(false);
        }}
      >
        {elements.map((value) => {
          return (
            <DropdownMenuCheckboxItem
              checked={currentElements.includes(value)}
              key={value as string}
              onCheckedChange={() => {
                if (currentElements.includes(value)) {
                  setCurrentElements((prevState) => prevState.filter((d) => d !== value));
                } else {
                  setCurrentElements((prevState) => {
                    return [...prevState, value];
                  });
                }
                setItemClicked(true);
              }}
              className="w-[200px]"
            >
              {(value as string).toUpperCase()}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownMenuSingle;
