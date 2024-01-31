import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "~components/ui/dialog";
import {ColorForm} from "~app/options/colors/form";
import {Button} from "~components/ui/button";
import {type FC, useEffect, useState} from "react";
import {storage} from "~app/storage";

export type EditColorModalProps = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onSuccess?: () => void;
    data: any[];
    color: any;
}

export const EditColorModal: FC<EditColorModalProps> = (props) => {
    const { data, open, onSuccess, color } = props;
    const [formKey, setFormKey] = useState<number>(Date.now());

    useEffect(() => {
        open && setFormKey(Date.now());
    }, [open]);

    const onSubmit = async (values: any) => {
        await storage.set("colors", data.map((item) => {
            if(item.color === values.color) return values;
            return item;
        }));
        onSuccess?.();
    }

    return <Dialog {...props}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>颜色</DialogTitle>
                <DialogDescription>以HEXA格式的色值作为基准，匹配即时设计画板可能会出现的RGB、RGBA、ARGB、HEX、HEXA、AHEX、HSL、HWB等格式并进行替换。</DialogDescription>
            </DialogHeader>
            <ColorForm
                type={"edit"}
                key={formKey}
                onSubmit={onSubmit}
                data={data}
                initValues={color}
            >
                <DialogFooter>
                    <Button type="submit">添加</Button>
                </DialogFooter>
            </ColorForm>
        </DialogContent>
    </Dialog>
}
