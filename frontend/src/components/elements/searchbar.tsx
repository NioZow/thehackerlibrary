import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

import { Bug } from 'lucide-react';

function Searchbar() {
  let data: Array<string> = ["test", "test2"]

  let getTrainings = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/training');
      const data = await response.json();
      const trainings = data as Array<Training>;
      return trainings
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  let data3 = getTrainings();
  console.log("Data3", data3);
 
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Search for a blog, course, lab..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Malware Development">
        {
          data.map((l, i) => {
            return <CommandItem key={i}>
              <Bug color="red" className="mr-2 h-4 w-4" size={20} />
              <span>{l}</span>
            </CommandItem>
          })
        }
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Active Directory">
        {
          data.map((l, i) => {
            return <CommandItem key={i}>
              <Bug color="red" className="mr-2 h-4 w-4" size={20} />
              <span>l</span>
            </CommandItem>
          })
        }
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export default Searchbar