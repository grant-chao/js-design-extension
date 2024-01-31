import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {AddOutput} from "~app/options/outputs/add";
import {useEffect, useState} from "react";
import { storage } from "~app/storage";
import {RemoveOutput} from "~app/options/outputs/remove";

export type OutputsProps = {
    id: string;
    title: string;
}

export const Outputs = () => {
    const [data, setData] = useState<OutputsProps[]>([]);

    const load = async () => {
        const outputs = await storage.get<OutputsProps[]>("outputs");
        setData(outputs || [])
    }

    useEffect(() => {
        load().then();
    }, [])

    return <>
        <div className={"my-2"}>
            <AddOutput
                data={data}
                onSuccess={() => load().then()}
            />
        </div>
        <Table className={"border"}>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">标识</TableHead>
                    <TableHead>描述</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((output) => (
                        <TableRow key={output.id}>
                            <TableCell className="font-medium">{output.id}</TableCell>
                            <TableCell>{output.title}</TableCell>
                            <TableCell className="text-right">
                                <RemoveOutput
                                    onSuccess={() => load().then()}
                                    data={data}
                                    id={output.id}
                                />
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </>
}
