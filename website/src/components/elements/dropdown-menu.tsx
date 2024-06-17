'use client';

import { useState } from 'react';

import { Button } from '@/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { ChevronDownIcon, DotIcon } from '@radix-ui/react-icons';

import { cn } from '@/util/style.util';

export type DropdownItem<T> = { label: string; value: T };

export interface IPropsSingle<T> {
  elements: DropdownItem<T>[];
  currentElement: DropdownItem<T>;
  setCurrentElement: React.Dispatch<React.SetStateAction<DropdownItem<T>>>;
  buttonName: string;
  className?: string;
  border?: boolean;
}

export interface IPropsMultiple<T> {
  elements: DropdownItem<T>[];
  currentElements: DropdownItem<T>[];
  setCurrentElements: React.Dispatch<React.SetStateAction<DropdownItem<T>[]>>;
  buttonName: string;
  className?: string;
  border?: boolean;
  onCloseCallback?: (items: { label: string; value: T }[]) => void;
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
          {buttonName.toUpperCase()}
          <DotIcon className="ml-2 h-4 w-4" />
          {currentElement.label.toUpperCase()}
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
        {elements.map((element) => {
          return (
            <DropdownMenuCheckboxItem
              checked={element.value === currentElement.value}
              key={element.value as string}
              onCheckedChange={() => {
                setCurrentElement(element);
                setItemClicked(true);
              }}
              className={cn('text-white', className)}
            >
              {element.label.toUpperCase()}
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
  onCloseCallback,
}: IPropsMultiple<T>): JSX.Element {
  const [openColumn, setColumnOpen] = useState(false);
  const [itemClicked, setItemClicked] = useState(false);

  return (
    <div>
      <DropdownMenu
        onOpenChange={() => {
          if (itemClicked) {
            setColumnOpen(true);
            setItemClicked(false);
          } else {
            if (openColumn) {
              // column was open, closed it
              onCloseCallback !== undefined ? onCloseCallback(currentElements) : null;
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
          {elements.map((element) => {
            const isChecked = currentElements.findIndex(({ value }) => value === element.value) !== -1;

            return (
              <DropdownMenuCheckboxItem
                checked={isChecked}
                key={element.value as string}
                onCheckedChange={() => {
                  if (isChecked) setCurrentElements((prevState) => prevState.filter((d) => d.value !== element.value));
                  else setCurrentElements((prevState) => [...prevState, element]);

                  setItemClicked(true);
                }}
                className={cn('text-white', className)}
              >
                {element.label.toUpperCase()}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DropdownMenuSingle;
