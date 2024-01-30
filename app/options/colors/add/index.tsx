import {Button} from "~components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "~components/ui/dialog";
import {useState} from "react";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "~components/ui/form";
import {Input} from "~components/ui/input";
import {z} from "~node_modules/zod";
import {useForm} from "~node_modules/react-hook-form";
import {zodResolver} from "~node_modules/@hookform/resolvers/zod";
import {storage} from "~app/storage";

export const AddColors = () => {
    const [open, setOpen] = useState<boolean>(false);
    const formSchema = z.object({
        color: z.string().min(1, {
            message: "色值不能为空",
        }).max(50),
    }).superRefine((rules, ctx) => {
    })
    const [defaultValues, setDefaultValues] = useState<z.infer<typeof formSchema>>({
        color: "",
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // data.push(values)
        // await storage.set("outputs", data);
        // setOpen(false);
        // onSuccess?.();
    }

    return <>
        <Button variant={"outline"} onClick={() => setOpen(true)} size={"sm"}>添加</Button>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>颜色</DialogTitle>
                    <DialogDescription>以HEXA格式的色值作为基准，匹配即时设计画板可能会出现的RGB、RGBA、ARGB、HEX、HEXA、AHEX、HSL、HWB等格式并进行替换。</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>色值</FormLabel>
                                    <FormControl>
                                        <Input placeholder="请输入色值" {...field} />
                                    </FormControl>
                                    <FormDescription>请输入 HEXA 格式的色值。</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                    <DialogFooter>
                        <Button type="submit">添加</Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    </>
}
