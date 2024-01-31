import {EnableSetting} from "~app/options/base/enable";
import {OutputSetting} from "~app/options/base/output";
import {ExportSetting} from "~app/options/base/export";

export const BaseOptions = () => {
    return <div className={"space-y-4 mt-4"}>
        <EnableSetting />
        <OutputSetting />
        <ExportSetting />
    </div>
}
