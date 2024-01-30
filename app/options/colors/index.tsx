import {Table, TableBody, TableHead, TableHeader, TableRow} from "~components/ui/table";
import {AddColors} from "~app/options/colors/add";

export const Colors = () => {
    return <>
        <div className={"my-2"}>
            <AddColors />
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
            </TableBody>
        </Table>
    </>
}
