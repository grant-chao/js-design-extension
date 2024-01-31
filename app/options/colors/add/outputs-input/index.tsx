import {type FC, forwardRef, useEffect, useState} from "react";
import type {OutputsProps} from "~app/options/outputs";
import {storage} from "~app/storage";
import {Input} from "~components/ui/input";

type Value = {
    [key: string]: string;
}

export type OutputsInputProps = {
    value?: Value;
    onChange?: (value: any) => void;
}

export const OutputsInput: FC<OutputsInputProps> = forwardRef((props, ref) => {
    const { value: v, onChange } = props;
    const [value, setValue] = useState<Value>(v);
    const [outputs, setOutputs] = useState<OutputsProps[]>([]);
    const watchMap = {
        "outputs": (c: any) => {
            setOutputs(c.newValue)
        }
    }
    useEffect(() => {
        storage.get<OutputsProps[]>("outputs").then((outputs) => {
            setOutputs(outputs || []);
        });
        storage.watch(watchMap)
        return () => {
            storage.unwatch(watchMap);
        }
    }, [])

    const onValueChange = (key: string, v: string) => {
        const newValue = {
            ...(value || {}),
            [key]: v
        };
        setValue(newValue);
        onChange?.(newValue);
    }

    const renderInput = (output: OutputsProps) => {
        return <div key={output.id} className={"flex justify-start items-center"}>
            <div className={"min-w-20 opacity-70"}>{output.title}</div>
            <Input
                value={value?.[output.id] || ''}
                onChange={(e) => onValueChange(output.id, e.target.value)}
                className={"flex-1"}
            />
        </div>
    }

    return <div className={"space-y-2"}>
        {outputs.map(renderInput)}
    </div>
});
