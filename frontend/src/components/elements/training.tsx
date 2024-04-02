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

import { Bug, Server, Globe } from 'lucide-react';
import { TrainingProps } from "@/components/elements/types"
import { Checkbox } from "@/components/ui/checkbox" 

export function TrainingPopup({ setTraining, training }: TrainingProps) { 

    if (training === undefined){
        return null;
    }

    return (
        <Dialog open={true}>
            <DialogContent onEscapeKeyDown={() => {setTraining(undefined)}} onInteractOutside={() => (setTraining(undefined))}> 
                <DialogHeader>
                    <DialogTitle>
                        <a href={training.Url} target="_blank">
                            {training.Name}
                        </a>
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
                                    {
                                        training.Date != "" ? <TableHead>Date</TableHead> : null
                                    }
                                    <TableHead className="text-right">
                                    {
                                        training.Type === "VIDEO" ? "Watched?" : "Read?"
                                    }
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="w-[100px]">{training.Difficulty}</TableCell>
                                    {
                                        training.Price != 0 ? <TableCell>{training.Price + "€"}</TableCell>: null
                                    }
                                    <TableCell>{training.Type}</TableCell>
                                    {
                                        training.Time != 0 ? <TableCell>{training.Time} min</TableCell> : null
                                    }
                                    {
                                        training.Date != "" ? <TableCell>{training.Date}</TableCell> : null
                                    }
                                    <TableCell className="text-right"><Checkbox id="done" /></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export function GetIcon({ icon } : { icon: Array<string> }){
    if (icon.includes("Malware Development")) {
        return <Bug color="red" className="mr-2 h-4 w-4" size={20} />
    } else if (icon.includes("Active Directory")) {
        return <Server color="white" className="mr-2 h-4 w-4" size={20} />
    } else if (icon.includes("Web")) {
        return <Globe color="#0099E6" className="mr-2 h-4 w-4" size={20} />
    }
}