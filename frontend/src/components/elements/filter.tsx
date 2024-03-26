import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from 'react';

export let Filters: string = "option-none"

function Filter() {
    const [value, setState] = useState('option-none');

    return (
        <div>
            <h2>Category: </h2>
            <RadioGroup value={value} onValueChange={(_value) => {
                setState(_value);
                Filters = _value; 
            }} defaultValue="option-none" id="radio-group">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-none" id="option-none" />
                    <Label htmlFor="option-none">None</Label>

                    <RadioGroupItem value="option-ad" id="option-ad" />
                    <Label htmlFor="option-ad">Active Directory</Label>

                    <RadioGroupItem value="option-maldev" id="option-maldev" />
                    <Label htmlFor="option-maldev">Malware Development</Label>

                    <RadioGroupItem value="option-web" id="option-web" />
                    <Label htmlFor="option-web">Web</Label>
                </div>
            </RadioGroup>
        </div>
    )
}

export default Filter