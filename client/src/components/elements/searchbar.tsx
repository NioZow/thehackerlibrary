import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandShortcut,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Checkbox } from "@/components/ui/checkbox";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useState } from "react";
import { RenderIcon } from "@/components/icons/icons";
import { Training } from "@/utils/types";
import { useTrainings } from "@/context/trainings-context";

function Searchbar() {
  const { trainings } = useTrainings();

  const [selectedTraining, setTraining] = useState<Training>();

  return (
    <div>
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Search for a blog, course, lab..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {
            // Sort the trainings, and iterate through it
            trainings
              .sort((a, b) => a.Name.localeCompare(b.Name))
              .map((training, i) => {
                let info: string = `${training.Type}`;

                return (
                  <CommandItem
                    key={i}
                    onSelect={() => {
                      setTraining(training);
                    }}
                  >
                    <RenderIcon icon={training.Tags} />
                    <span>{training.Name}</span>
                    <CommandShortcut>{info}</CommandShortcut>
                  </CommandItem>
                );
              })
          }
        </CommandList>
      </Command>
      <ShowTrainingInformation
        setTraining={setTraining}
        training={selectedTraining}
      />
    </div>
  );
}

interface Props {
  setTraining: React.Dispatch<React.SetStateAction<Training | undefined>>;
  training: Training | undefined;
}

const ShowTrainingInformation = ({ setTraining, training }: Props) => {
  if (training === undefined) {
    return null;
  }

  return (
    <Dialog
      open={true}
      onOpenChange={() => {
        setTraining(undefined);
      }}
    >
      <DialogContent
        onEscapeKeyDown={() => {
          setTraining(undefined);
        }}
        onInteractOutside={() => setTraining(undefined)}
      >
        <DialogHeader>
          <DialogTitle>
            <a href={training.Url} target="_blank">
              {training.Name}
            </a>
          </DialogTitle>
          <DialogDescription>
            By{" "}
            {training.Authors.map((author, i) => {
              return i != training.Authors.length - 1 ? author + ", " : author;
            })}
            <pre>
              {training.Tags.map((tag, i) => {
                return i != training.Tags.length - 1 ? tag + ", " : tag;
              })}
            </pre>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Difficulty</TableHead>
                  {training.Price != 0 ? <TableHead>Price</TableHead> : null}
                  <TableHead>Type</TableHead>
                  {training.Time != 0 ? <TableHead>Time</TableHead> : null}
                  {training.Date != "" ? <TableHead>Date</TableHead> : null}
                  <TableHead className="text-right">
                    {training.Type === "VIDEO" ? "Watched?" : "Read?"}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="w-[100px]">
                    {training.Difficulty}
                  </TableCell>
                  {training.Price != 0 ? (
                    <TableCell>{training.Price + "€"}</TableCell>
                  ) : null}
                  <TableCell>{training.Type}</TableCell>
                  {training.Time != 0 ? (
                    <TableCell>{training.Time} min</TableCell>
                  ) : null}
                  {training.Date != "" ? (
                    <TableCell>{training.Date}</TableCell>
                  ) : null}
                  <TableCell className="text-right">
                    <Checkbox id="done" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Searchbar;
