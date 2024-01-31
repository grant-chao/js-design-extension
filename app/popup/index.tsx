import {EnableSetting} from "~app/options/base/enable";
import {OutputSetting} from "~app/options/base/output";

export const Popup = () => {
    const openOptions = () => {
        chrome.runtime.openOptionsPage();
    }

    return <div className={"bg-secondary w-[260px]"}>
        <div className={"p-4 bg-white rounded-b-xl space-y-4"}>
            <EnableSetting />
            <OutputSetting />
        </div>
        <div className={"px-4 py-2 flex justify-center items-center"}>
            <div className={"cursor-pointer"} onClick={openOptions}>
                更多设置
            </div>
            <div className={"flex-1 text-right text-muted-foreground"}>
                v1.0.0
            </div>
        </div>
    </div>
}
