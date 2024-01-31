import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "~components/ui/table";
import {AddColors} from "~app/options/colors/add";
import {useEffect, useState} from "react";
import {storage} from "~app/storage";
import type {OutputsProps} from "~app/options/outputs";
import {RemoveColor} from "~app/options/colors/remove";
import {Button} from "~components/ui/button";
import {EditColorModal} from "~app/options/colors/edit/modal";

export type ColorsProps = {
    color?: string;
    title?: string;
    outputs?: OutputsProps[];
    full?: {
        rgb?: string;
        hex?: string;
        hsl?: string;
        rgba?: string;
        hexa?: string;
        argb?: string;
        ahex?: string;
        hwb?: string;
    };
}

export const Colors = () => {
    const [data, setData] = useState<ColorsProps[]>([]);
    const [outputs, setOutputs] = useState<OutputsProps[]>([]);
    const [editOpen, setEditOpen] = useState(false);
    const [editData, setEditData] = useState<ColorsProps>({});

    const load = async () => {
        const colors = await storage.get<ColorsProps[]>("colors");
        const outputs = await storage.get<OutputsProps[]>("outputs");
        setOutputs(outputs || []);
        setData(colors || []);
    }

    useEffect(() => {
        load().then();
    }, [])

    return <>
        <div className={"my-2"}>
            <AddColors
                data={data}
                onSuccess={() => load().then()}
            />
        </div>
        <Table className={"border"}>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">颜色</TableHead>
                    <TableHead>描述</TableHead>
                    { outputs.map((output) => <TableHead key={output.id}>{output.title}</TableHead>) }
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((color) => (
                        <TableRow key={color.color}>
                            <TableCell className="font-medium">{color.color}</TableCell>
                            <TableCell>{color.title}</TableCell>
                            { outputs.map((output) => <TableHead key={output.id}>{color.outputs?.[output.id] || '--'}</TableHead>) }
                            <TableCell className="text-right">
                                <Button
                                    className={"h-auto"}
                                    variant={"link"}
                                    size={"sm"}
                                    onClick={() => {
                                        setEditData(color);
                                        setEditOpen(true);
                                    }}
                                >
                                    编辑
                                </Button>
                                <RemoveColor
                                    onSuccess={() => load().then()}
                                    data={data}
                                    color={color.color}
                                />
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
        <EditColorModal
            open={editOpen}
            onOpenChange={setEditOpen}
            onSuccess={() => {
                setEditOpen(false);
                load().then();
            }}
            data={data}
            color={editData}
        />
    </>
}
