import React from 'react';

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

import { DropdownMenuMultiple, IPropsMultiple } from '@/element/dropdown-menu';

import { Difficulty } from '@/constant/types';

interface IProps {
  difficulty: IPropsMultiple<Difficulty>;
}

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

export const AdvancedSearch = ({ difficulty }: IProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:bg-indigo-900">
          <GearIcon /> &nbsp; Advanced Search
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-indigo-950">
        <DialogHeader>
          <DialogTitle>Advanced Search</DialogTitle>
          <DialogDescription className="text-white">Make advanced searches...</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Search</Label>
            <Input defaultValue="" className="col-span-3 bg-indigo-950 w-[200px] bg-neutral-900 hover:bg-indigo-900" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Price" className="text-right">
              Date
            </Label>
            <PopoverDate />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Price" className="text-right">
              Price
            </Label>
            <PopoverPrice />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="difficulty" className="text-right">
              Difficulty
            </Label>
            <DropdownMenuMultiple
              elements={difficulty.elements}
              currentElements={difficulty.currentElements}
              setCurrentElements={difficulty.setCurrentElements}
              buttonName={difficulty.buttonName}
              className={difficulty.className}
              border={true}
            />
          </div>
        </div>
        <DialogFooter>
          <Button className="hover:bg-indigo-900 border">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedSearch;
