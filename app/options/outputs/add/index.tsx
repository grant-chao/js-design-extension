import {Button} from "~components/ui/button";
import { storage } from "~app/storage";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {type FC, useEffect, useState} from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

export type AddOutputProps = {
    data: any[];
    onSuccess?: () => void;
}



export const AddOutput: FC<AddOutputProps> = (props) => {
    const { data, onSuccess } = props;
    const [open, setOpen] = useState<boolean>(false);
    const formSchema = z.object({
        id: z.string().min(1, {
            message: "标识不能为空",
        }).max(50),
        title: z.string().min(1, {
            message: "描述不能为空",
        }).max(50),
    }).superRefine(({id}, ctx) => {
        const size = data.filter(({id: i}) => i === id).length;
        if(size > 0) {
            ctx.addIssue({
                code: 'custom',
                path: ['id'],
                message: '标识已存在'
            })
        }
    })
    const [defaultValues, setDefaultValues] = useState<z.infer<typeof formSchema>>({
        id: "",
        title: "",
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    useEffect(() => {
        if(open) {
            setDefaultValues({
                id: "",
                title: "",
            })
        }
    }, [open])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        data.push(values)
        await storage.set("outputs", data);
        setOpen(false);
        onSuccess?.();
    }

    return <>
        <Button variant={"outline"} onClick={() => setOpen(true)} size={"sm"}>添加</Button>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>输出类型</DialogTitle>
                    <DialogDescription>根据不同的语言，输出的参数将有所不同，如CSS变量，Tailwind，Dart变量。</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>标识</FormLabel>
                                    <FormControl>
                                        <Input placeholder="唯一标识" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>描述</FormLabel>
                                    <FormControl>
                                        <Input placeholder="用于显示的描述信息" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">添加</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    </>
}
