import {Separator} from "~components/ui/separator";
import {BaseOptions} from "~app/options/base";
import {useState} from "react";
import classNames from "classnames";
import {Outputs} from "~app/options/outputs";
import {Toaster} from "~components/ui/toaster";
import {Colors} from "~app/options/colors";

type TabItem = {
    id: string,
    title: string,
    content: any
}

const tabs: TabItem[] = [
    {
        id: 'base',
        title: '基础',
        content: <BaseOptions />
    },
    {
        id: 'outputs',
        title: '输出',
        content: <Outputs />
    },
    {
        id: 'colors',
        title: '颜色',
        content: <Colors />
    }
]

export const Options = () => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    const content = tabs.find(tab => tab.id === activeTab)?.content;

    const renderTab = (tab: TabItem) => {
        return <div
            key={tab.id}
            className={classNames(
                "px-4 py-1 text-muted-foreground text-sm rounded-full cursor-pointer hover:text-primary",
                activeTab === tab.id && "bg-muted font-medium text-primary",
            )}
            onClick={() => setActiveTab(tab.id)}
        >
            {tab.title}
        </div>
    }

    return <div className={"mx-4 my-0"}>
        <div className={"my-2 flex justify-start items-center space-x-2"}>
            { tabs.map(renderTab) }
        </div>
        <Separator className={"my-2"} />
        { content }
        <Toaster />
    </div>
}
