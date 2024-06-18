'use client';

import React from 'react';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { newParams } from '@/src/utils/params';
import { Button } from '@/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { GearIcon } from '@radix-ui/react-icons';

import { DropdownMenuMultiple, DropdownItem } from '@/element/dropdown-menu';

import { Difficulty, SearchParams } from '@/constant/types';

type DifficultyDropdownItem = DropdownItem<Difficulty>;

export const difficulties: DifficultyDropdownItem[] = [
  { label: 'easy', value: 'easy' },
  { label: 'medium', value: 'medium' },
  { label: 'hard', value: 'hard' },
  { label: 'insane', value: 'insane' },
];

const PopoverPrice = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full border w-[200px] hover:bg-indigo-900">CHANGE PRICE</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-indigo-900">
        <div className="grid gap-4">
          <div className="space-y-2">
            <p className="font-medium leading-none text-white">Price</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-white">Minimum</Label>
              <Input defaultValue="" className="col-span-2 h-8 bg-neutral-900 text-white" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-white">Maximum</Label>
              <Input defaultValue="" className="col-span-2 h-8 bg-neutral-900 text-white" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const PopoverDate = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full border w-[200px] hover:bg-indigo-900">CHANGE DATE</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-indigo-900">
        <div className="grid gap-4">
          <div className="space-y-2">
            <p className="font-medium leading-none text-white">Date</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-white">Minimum</Label>
              <Input defaultValue="" className="col-span-2 h-8 bg-neutral-900 text-white" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-white">Maximum</Label>
              <Input defaultValue="" className="col-span-2 h-8 bg-neutral-900 text-white" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

interface IProps {
  searchParams: SearchParams;
}

export const AdvancedSearch = ({ searchParams }: IProps) => {
  let sp = new URLSearchParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [previousOpen, setPreviousOpen] = useState(false);

  const [filter, setFilter] = useState('');
  const [currentDifficulties, setCurrentDifficulties] = useState<DifficultyDropdownItem[]>(
    difficulties.filter(({ value }) => searchParams.difficulty.includes(value)) ?? [difficulties[0]],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (!previousOpen) {
          setPreviousOpen(true);
          setOpen(true);
        } else {
          setPreviousOpen(false);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="hover:bg-indigo-900 text-white">
          <GearIcon /> &nbsp; Advanced Search
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] bg-indigo-950 text-white"
        onInteractOutside={() => {
          setOpen(false);
        }}
        onEscapeKeyDown={() => {
          setOpen(false);
        }}
      >
        <DialogHeader>
          <DialogTitle>Advanced Search</DialogTitle>
          <DialogDescription className="text-white">Make advanced searches...</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Search</Label>
            <Input
              className="col-span-3 bg-indigo-950 w-[200px] bg-neutral-900 hover:bg-indigo-900"
              value={filter}
              onChange={(event) => {
                setFilter(event.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="difficulty" className="text-right">
              Difficulty
            </Label>
            <DropdownMenuMultiple
              elements={difficulties}
              currentElements={currentDifficulties}
              setCurrentElements={setCurrentDifficulties}
              buttonName="Difficulty"
              className="w-[200px] hover:bg-indigo-900"
              border={true}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="hover:bg-indigo-900 border"
            onClick={() => {
              searchParams.difficulty = currentDifficulties.map(({ value }) => value);
              searchParams.where = filter;

              sp = newParams(searchParams, true);

              router.push(`/?${sp.toString()}`);
              setOpen(false);
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedSearch;
