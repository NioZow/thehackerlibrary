
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
import { Bug, Server, Globe } from 'lucide-react';
import TrainingPopup from "@/components/elements/training";

const TYPES_TRAINING: Record<number,string> = {
  1 : "BLOGPOST",
  2 : "COURSE",
  3 : "WEBSITE",
  4 : "LAB",
  5 : "SOURCECODE",
  6 : "CHEATSHEET",
  7 : "VIDEO"
}

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
              let info: string = `${TYPES_TRAINING[training.Type]}`
              
              if (training.Tags.includes("Malware Development")) {
                return (
                  <CommandItem key={i} onSelect={() => {
                    setTraining(training)
                  }}>
                    <Bug color="red" className="mr-2 h-4 w-4" size={20} />
                    <span>{training.Name}</span>
                    <CommandShortcut>{info}</CommandShortcut>
                  </CommandItem>
                )
              } else if (training.Tags.includes("Active Directory")) {
                return (
                  <CommandItem key={i} onSelect={() => {
                    setTraining(training)
                  }}>
                    <Server color="white" className="mr-2 h-4 w-4" size={20} />
                    <span>{training.Name}</span>
                    <CommandShortcut>{info}</CommandShortcut>
                  </CommandItem>
                )
              } else if (training.Tags.includes("Web")) {
                return (
                  <CommandItem key={i} onSelect={() => {
                    setTraining(training)
                  }}>
                    <Globe color="#0099E6" className="mr-2 h-4 w-4" size={20} />
                    <span>{training.Name}</span>
                    <CommandShortcut>{info}</CommandShortcut>
                  </CommandItem>
                )
              }
            })
          }
        </CommandList>
      </Command>
      <TrainingPopup setTraining={setTraining} training={selectedTraining}/>
    </div>
  ) 
}

export default Searchbar