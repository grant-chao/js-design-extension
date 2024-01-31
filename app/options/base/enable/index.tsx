import {Switch} from "~components/ui/switch";
import {useEffect, useState} from "react";
import {storage} from "~app/storage";

export const EnableSetting = () => {
    const [enable, setEnable] = useState<boolean>(false);

    const watchMap = {
        "setting.enable": (c: any) => {
            setEnable(c.newValue)
        }
    }

    useEffect(() => {
        storage.get<boolean>("setting.enable").then((enable) => {
            setEnable(enable || false)
        });
        storage.watch(watchMap)
        return () => {
            storage.unwatch(watchMap);
        }
    }, [])

    const onCheckedChange = async (v: boolean) => {
        await storage.set("setting.enable", v);
        setEnable(v);
    }

    return <div className={"flex justify-start items-center"}>
        <div className={"min-w-20 opacity-60"}>是否启用</div>
        <div className={"flex justify-start items-center"}>
            <Switch checked={enable} onCheckedChange={onCheckedChange} />
        </div>
    </div>
}
