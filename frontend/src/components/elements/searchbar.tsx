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
import { Filters } from '@/components/elements/filter';

const TrainingType: Record<number,string> = {
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

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Search for a blog, course, lab..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {
          // Sort the data, and iterate through it
          data.sort((a, b) => a.Name.localeCompare(b.Name)).map((training, i) => { 
            let info: string = `${training.Authors} - ${TrainingType[training.Type]}`

            console.log(Filters === "option-none")
          
            if (training.Tags.includes("Malware Development") && (training.Tags.includes(Filters) || Filters === "option-none")) {
              return <CommandItem key={i}>
                <Bug color="red" className="mr-2 h-4 w-4" size={20} />
                <span className="noOverflow">{training.Name}</span>
                <CommandShortcut>{info}</CommandShortcut>
              </CommandItem>
            } else if (training.Tags.includes("Active Directory") && (training.Tags.includes(Filters) || Filters === "option-none")) {
              return <CommandItem key={i}>
                <Server color="white" className="mr-2 h-4 w-4" size={20} />
                <span>{training.Name}</span>
                <CommandShortcut>{info}</CommandShortcut>
              </CommandItem>
            } else if (training.Tags.includes("Web") && (training.Tags.includes(Filters) || Filters === "option-none")) {
              return <CommandItem key={i}>
                <Globe color="white" className="mr-2 h-4 w-4" size={20} />
                <span>{training.Name}</span>
                <CommandShortcut>{info}</CommandShortcut>
              </CommandItem>
            }
          })
        }
      </CommandList>
    </Command>
  )
}

export default Searchbar