import toast, { Toaster } from 'react-hot-toast';
import {useEffect} from "react";
import {Helper} from "~app/helper";
import type {PlasmoCSConfig} from "~node_modules/plasmo";
const helper = new Helper();

const ContentUI = () => {
    useEffect(() => {
        let timer = null;
        helper.init({
            onCopy: (v) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    navigator.clipboard.writeText(v).then(() => {
                        toast(v + " 复制成功");
                    });
                }, 200);
            }
        }).then();
    }, [])
    return <Toaster
        toastOptions={{
            style: {
                background: '#fff',
                borderRadius: '4px',
                padding: '5px 16px',
                color: 'rgba(0,0,0,0.7)',
                boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            },
        }}
    />
}

export default ContentUI;

export const config: PlasmoCSConfig = {
    matches: ["https://js.design/*"],
    all_frames: true
}
