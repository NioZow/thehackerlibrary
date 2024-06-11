import { useState } from 'react';

import { Button } from '@/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { ChevronDownIcon, DotIcon } from '@radix-ui/react-icons';

import { cn } from '@/util/style.util';

export interface IPropsSingle<T> {
  elements: T[];
  currentElement: T;
  setCurrentElement: React.Dispatch<React.SetStateAction<T>>;
  buttonName: string;
  className?: string;
  border?: boolean;
}

export interface IPropsMultiple<T> {
  elements: T[];
  currentElements: T[];
  setCurrentElements: React.Dispatch<React.SetStateAction<T[]>>;
  buttonName: string;
  className?: string;
  border?: boolean;
}

export function DropdownMenuSingle<T>({
  elements,
  currentElement,
  setCurrentElement,
  buttonName,
  className,
  border,
}: IPropsSingle<T>) {
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
        <Button className={cn('w-[200px] hover:bg-indigo-900', border ? 'border' : null)}>
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
        className="bg-indigo-900"
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
              className={cn('text-white', className)}
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
  className,
  border,
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
        <Button className={cn('w-[200px] hover:bg-indigo-900', border ? 'border' : null)}>
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
        className="bg-indigo-900"
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
              className={cn('text-white', className)}
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
