import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Difficulty: Record<number, string> = {
    1 : "Easy",
    2 : "Medium",
    3 : "Hard",
    4 : "Insane",
}

const TYPES_TRAINING: Record<number,string> = {
  1 : "BLOGPOST",
  2 : "COURSE",
  3 : "WEBSITE",
  4 : "LAB",
  5 : "SOURCECODE",
  6 : "CHEATSHEET",
  7 : "VIDEO"
}

interface Training {
    Type: number;
    Tags: Array<string>; 
    Price: number;
    Url: string;
    Authors: Array<string>;
    Name: string;
    Time: number;
    Date: string;
    Difficulty: number;
}

interface WrapperProps {
  children: React.ReactNode;
}

interface TrainingProps {
    setTraining: React.Dispatch<React.SetStateAction<Training | undefined>>;
    training: Training | undefined;
}

function TrainingPopup({ setTraining, training }: TrainingProps) { 

    if (training === undefined){
        return null;
    }

    return (
        <Dialog open={true}>
            <DialogContent onEscapeKeyDown={() => {setTraining(undefined)}} onInteractOutside={() => (setTraining(undefined))}> 
                <DialogHeader>
                    <DialogTitle>
                        {training.Name}
                    </DialogTitle>
                    <DialogDescription>
                        By {training.Authors.map((author, i) => {
                            return i != training.Authors.length - 1 ? author + ", " : author
                        })}
                        <pre>
                            {training.Tags.map((tag, i) => {
                                return i != training.Tags.length - 1 ? tag + ", " : tag
                            })}
                        </pre>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Difficulty</TableHead>
                                    {
                                        training.Price != 0 ? <TableHead>Price</TableHead>: null
                                    }
                                    <TableHead>Type</TableHead>
                                    {
                                        training.Time != 0 ? <TableHead>Time</TableHead> : null
                                    }
                                    <TableCell>Read?</TableCell>
                                    <TableHead className="text-right">Link</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="w-[100px]">{Difficulty[training.Difficulty]}</TableCell>
                                    {
                                        training.Price != 0 ? <TableCell>{training.Price + "€"}</TableCell>: null
                                    }
                                    <TableCell>{TYPES_TRAINING[training.Type]}</TableCell>
                                    {
                                        training.Time != 0 ? <TableCell>{training.Time} min</TableCell> : null
                                    }
                                    <TableCell>Yes</TableCell>
                                    <TableCell className="text-right"><a href={training.Url} target="_blank">Link</a></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );

}

export default TrainingPopup