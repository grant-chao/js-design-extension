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

export type RemoveColorProps = {
    data: any[];
    color: string;
    onSuccess?: () => void;
}

export const RemoveColor: FC<RemoveColorProps> = (props) => {
    const { color: c, data, onSuccess } = props;

    const remove = async () => {
        const filtered = data.filter((color) => color.color !== c);
        await storage.set("colors", filtered);
        onSuccess?.();
    }

    return <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button className={"h-auto"} variant={"link"} size={"sm"}>删除</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>提示</AlertDialogTitle>
                <AlertDialogDescription>是否删除该色值配置？</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction onClick={remove}>删除</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}
