
"use client"

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandShortcut,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { useState, useEffect } from 'react';
import { TrainingPopup, GetIcon } from "@/components/elements/training";
import { Training } from "@/components/elements/types"

function Searchbar() {

  const [data, setData] = useState<Training[]>([])
  useEffect(() => {
    fetch('http://localhost:8000/api/training')
    .then(res => res.json())
    .then(setData)
  }, [])

  const [selectedTraining, setTraining] = useState<Training>()

  return ( 
    <div>
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Search for a blog, course, lab..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {
            // Sort the data, and iterate through it
            data.sort((a, b) => a.Name.localeCompare(b.Name)).map((training, i) => { 
              let info: string = `${training.Type}`
              
              return (
                <CommandItem key={i} onSelect={() => {
                  setTraining(training)
                }}>
                  <GetIcon icon={training.Tags}/>
                  <span>{training.Name}</span>
                  <CommandShortcut>{info}</CommandShortcut>
                </CommandItem>
              )
            })
          }
        </CommandList>
      </Command>
      <TrainingPopup setTraining={setTraining} training={selectedTraining}/>
    </div>
  ) 
}

export default Searchbar