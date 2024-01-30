import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import type {FC} from "react";
import {storage} from "~app/storage";

export type RemoveOutputProps = {
    data: any[];
    id: string;
    onSuccess?: () => void;
}

export const RemoveOutput: FC<RemoveOutputProps> = (props) => {
    const { id, data, onSuccess } = props;

    const remove = async () => {
        const filtered = data.filter((output) => output.id !== id);
        await storage.set("outputs", filtered);
        onSuccess?.();
    }

    return <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button className={"h-auto"} variant={"link"} size={"sm"}>删除</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>提示</AlertDialogTitle>
                <AlertDialogDescription>删除后，基础设置需要重新设置，配置的参数也将丢失，是否要删除这个输出类型？</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction onClick={remove}>删除</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}
