import {type ChangeEvent, useEffect, useState} from "react";
import {storage} from "~app/storage";
import type {OutputsProps} from "~app/options/outputs";

export const OutputSetting = () => {
    const [outputs, setOutputs] = useState<OutputsProps[]>([]);
    const [output, setOutput] = useState<string>('');

    const watchMap = {
        "outputs": (c: any) => {
            setOutputs(c.newValue)
        },
        "setting.output": (c: any) => {
            setOutput(c.newValue)
        }
    }

    useEffect(() => {
        storage.get<OutputsProps[]>("outputs").then((outputs) => {
            setOutputs(outputs || []);
        });
        storage.get<string>("setting.output").then((output) => {
            setOutput(output || '')
        });
        storage.watch(watchMap)
        return () => {
            storage.unwatch(watchMap);
        }
    }, [])

    const onChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        const v = e.target.value;
        await storage.set("setting.output", v);
        setOutput(v);
    }

    return <div className={"flex justify-start items-center"}>
        <div className={"min-w-20 opacity-60"}>输出模式</div>
        <div className={"flex justify-start items-center"}>
            <select value={output} onChange={onChange}>
                <option value={''}>请选择</option>
                { outputs.map((output) => <option key={output.id} value={output.id}>{output.title}</option>) }
            </select>
        </div>
    </div>
}
