import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import { Bug, Server } from 'lucide-react';

function Searchbar() {

  let data: Array<Training> = [{
    Type: 1,
    Tags: [
      "Malware Development"  
    ],
    Price: 0,
    Url: "http://localhost",
    Authors: [
      "Deep End"
    ],
    Name: "Failed to load trainings :(",
    Description: "Find myself again",
    Time: 20,
    Date: "2020-04-04"
  }];

  function getTrainings(): Promise<Training[]> {
     return fetch("http://localhost:8000/api/training")
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json() as Promise<Training[]>
      })
  }

  getTrainings().then((value) => {
    data = value
    console.log("hello")
  })

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Search for a blog, course, lab..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {
          data.map((training, i) => { 
            if (training.Tags.includes("Malware Development")) {
              return <CommandItem key={i}>
                <Bug color="red" className="mr-2 h-4 w-4" size={20} />
                <span>{training.Name}</span>
              </CommandItem>
            } else if (training.Tags.includes("Active Directory")) {
              return <CommandItem key={i}>
                <Server color="white" className="mr-2 h-4 w-4" size={20} />
                <span>{training.Name}</span>
              </CommandItem>
            }
          })
        }
      </CommandList>
    </Command>
  )
}

export default Searchbar