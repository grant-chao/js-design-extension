import {Button} from "~components/ui/button";
import {storage} from "~app/storage";
import {type ChangeEvent, useEffect, useRef} from "react";

export const ExportSetting = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const exportData = async () => {
        const data = await storage.rawGetAll();
        const file = JSON.stringify(data , null, 4); //indentation in json format, human readable
        const vLink = document.createElement('a'),
            vBlob = new Blob([file], {type: "octet/stream"}),
            vName = `js.design.tools-${Date.now()}.json`,
            vUrl = window.URL.createObjectURL(vBlob);
        vLink.setAttribute('href', vUrl);
        vLink.setAttribute('download', vName );
        vLink.click();
    }

    const importData = async (e: any) => {
        const data = JSON.parse(e.target.result);
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            await storage.set(key, JSON.parse(data[key]));
        }
    }

    useEffect(() => {
        inputRef.current?.addEventListener("change", (e) => {
            const files = (e.target as HTMLInputElement).files, reader = new FileReader();
            reader.onload = importData;
            reader.readAsText(files[0]);
        }, false);
    }, []);

    return <div className={"flex justify-start items-center"}>
        <div className={"min-w-20 opacity-60"}>配置与数据</div>
        <div className={"flex justify-start items-center space-x-2"}>
            <Button onClick={() => inputRef.current.click()} variant={"outline"} size={"sm"}>导入</Button>
            <Button onClick={exportData} variant={"outline"} size={"sm"}>导出</Button>
            <input ref={inputRef} type="file" accept=".json" className={"hidden"} />
        </div>
    </div>
}
