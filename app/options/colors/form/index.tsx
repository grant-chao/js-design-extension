import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "~components/ui/form";
import {Input} from "~components/ui/input";
import {OutputsInput} from "~app/options/colors/add/outputs-input";
import {type FC, type PropsWithChildren, useState} from "react";
import {z} from "~node_modules/zod";
import type {ColorsProps} from "~app/options/colors";
import {useForm} from "~node_modules/react-hook-form";
import {zodResolver} from "~node_modules/@hookform/resolvers/zod";

export type ColorFormProps = {
    data: ColorsProps[];
    initValues?: any;
    onSubmit?: (values: any) => void;
    type: 'add' | 'edit'
} & PropsWithChildren;

export const ColorForm: FC<ColorFormProps> = (props) => {
    const { data, onSubmit, initValues, type } = props;
    const formSchema = z.object({
        color: z.string().min(1, {
            message: "色值不能为空",
        }).max(50),
        title: z.string().min(1, {
            message: "请输入描述",
        }).max(50),
        outputs: z.any()
    }).superRefine(({color, outputs: os}, ctx) => {
        if(!color.startsWith("#") || color.length !== 9) {
            ctx.addIssue({
                code: 'custom',
                path: ['color'],
                message: '请输入HEXA格式的色值'
            })
        }
        const size = data.filter(({color: i}) => i === color).length;
        if(type === 'add' && size > 0) {
            ctx.addIssue({
                code: 'custom',
                path: ['color'],
                message: '色值已存在'
            })
        }
    })
    const [defaultValues, setDefaultValues] = useState<z.infer<typeof formSchema>>(initValues);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>色值</FormLabel>
                        <FormControl>
                            <Input disabled={type === 'edit'} placeholder="请输入色值" {...field} />
                        </FormControl>
                        <FormDescription>请输入 HEXA 格式的色值。</FormDescription>
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
                            <Input placeholder="请输入描述" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="outputs"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>输出</FormLabel>
                        <FormControl>
                            <OutputsInput {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            { props.children }
        </form>
    </Form>
}
