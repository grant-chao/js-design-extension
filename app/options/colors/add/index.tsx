import {Button} from "~components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "~components/ui/dialog";
import {type FC, useEffect, useState} from "react";
import type {ColorsProps} from "~app/options/colors";
import {ColorForm} from "~app/options/colors/form";
import {storage} from "~app/storage";

export type AddColorsProps = {
    onSuccess?: () => void;
    data: ColorsProps[];
}

export const AddColors: FC<AddColorsProps> = (props) => {
    const { data, onSuccess } = props;
    const [open, setOpen] = useState<boolean>(false);
    const [formKey, setFormKey] = useState<number>(Date.now());

    useEffect(() => {
        open && setFormKey(Date.now());
    }, [open]);

    async function onSubmit(values: any) {
        data.push(values)
        await storage.set("colors", data);
        setOpen(false);
        onSuccess?.();
    }

    return <>
        <Button variant={"outline"} onClick={() => setOpen(true)} size={"sm"}>添加</Button>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>颜色</DialogTitle>
                    <DialogDescription>以HEXA格式的色值作为基准，匹配即时设计画板可能会出现的RGB、RGBA、ARGB、HEX、HEXA、AHEX、HSL、HWB等格式并进行替换。</DialogDescription>
                </DialogHeader>
                <ColorForm
                    key={formKey}
                    type={"add"}
                    onSubmit={onSubmit}
                    data={data}
                    initValues={{
                        color: "",
                        title: "",
                        outputs: null,
                    }}
                >
                    <DialogFooter>
                        <Button type="submit">添加</Button>
                    </DialogFooter>
                </ColorForm>
            </DialogContent>
        </Dialog>
    </>
}
