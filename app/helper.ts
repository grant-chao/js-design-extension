import {storage} from "~app/storage";
import type {OutputsProps} from "~app/options/outputs";
import type {ColorsProps} from "~app/options/colors";
import {hex2opacity, hex2rgb, rgb2hsl, rgb2hwb} from "~app/utils";

export type HelperInitProps = {
    onCopy?: (value: string) => void;
}

export class Helper {
    colorPickerBoxList: HTMLElement[] = [];
    outputs: OutputsProps[] = [];
    colors: ColorsProps[] = [];
    enable: boolean = false;
    output: string = '';
    colorMap: any = {};
    props: HelperInitProps;

    async init(props: HelperInitProps) {
        this.props = props;
        await this.initConfig();
        this.initPanel();
    }

    async initConfig() {
        this.outputs = await storage.get("outputs");
        this.colors = this.handleColors(await storage.get("colors"));
        this.enable = await storage.get("setting.enable");
        this.output = await storage.get("setting.output");
        storage.watch({
            "setting.enable": (c: any) => {
                this.enable = c.newValue;
                this.hackPickerBox();
            },
            "setting.output": (c: any) => {
                this.output = c.newValue;
                this.hackPickerBox();
            },
            "outputs": (c: any) => {
                this.outputs = c.newValue;
                this.hackPickerBox();
            },
            "colors": (c: any) => {
                this.colors = this.handleColors(c.newValue);
                this.hackPickerBox();
            }
        })
    }

    handleColors(colors: ColorsProps[]) {
        return colors.map((color) => {
            const { color: c } = color;
            const hex = c.substring(1, 7);
            const hexOpacity = c.substring(7, 9);
            const opacity = hex2opacity(hexOpacity);
            const rgb = hex2rgb(hex);
            const hsl = rgb2hsl(rgb);
            const hwb = rgb2hwb(rgb);
            color.full = {
                hexa: c,
                hex,
                ahex: `#${hexOpacity}${hex}`,
                rgb: `rgb(${rgb.join(', ')})`,
                rgba: `rgba(${rgb.join(', ')}, ${opacity})`,
                argb: `argb(${opacity}, ${rgb.join(', ')})`,
                hsl: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`,
                hwb: `hwb(${hwb[0]}, ${hwb[1]}%, ${hwb[2]}%)`,
            };
            return color;
        });
    }

    initPanel() {
        const root = document.getElementById('root');
        if(!root) return;
        const observer = new MutationObserver((list, observer) => {
            const panel = document.getElementById('editRightPanel');
            if(panel) { // panel is ready
                this.initPanelObserver(panel);
                observer.disconnect();
            }
        });
        observer.observe(root, {
            childList: true,
            subtree: true,
        });
    }

    initPanelObserver(panel: HTMLElement) {
        const observer = new MutationObserver((record, observer) => {
            const values = record.filter(({target}) => (target as HTMLElement).className.includes('copyColorVal'));
            if(record.length === values.length) return;
            const panel = document.getElementById('markAttributeListPanel');
            this.colorPickerBoxList = this.getColorPickerBox(panel);
            this.hackPickerBox();
        });
        observer.observe(panel, {
            childList: true,
            subtree: true,
        });
    }

    getColorPickerBox(panel: HTMLElement) {
        const list = [];
        const handler = (el: HTMLElement) => {
            if(el.className.toString().includes('colorPickerBox')) {
                list.push(el);
            }else{
                const children = el.children;
                for(let item of children) {
                    handler(item as HTMLElement);
                }
            }
        }
        handler(panel);
        return list;
    }

    itemClick(e: MouseEvent) {
        e.stopPropagation();
        const { onCopy } = this.props;
        const v = (e.target as HTMLDivElement).innerHTML as string;
        onCopy?.(v);
    }

    hackPickerBox() {
        if(!this.enable) {
            this.restore();
            return;
        }
        this.colorPickerBoxList.forEach((item: HTMLElement) => {
            let html = item.children.item(1).children.item(0).innerHTML;
            const origin = this.colorMap[html] || html;
            for(let color of this.colors) {
                const { full } = color;
                const keys = Object.keys(full);
                for(let key of keys) {
                    const value = full[key];
                    if(value === origin) {
                        const v = color.outputs[this.output];
                        if(!v) break;
                        item.children.item(1).children.item(0).innerHTML = v;
                        this.colorMap[v] = origin;
                        break;
                    }
                }
            }
            item.removeEventListener('click', this.itemClick.bind(this));
            item.addEventListener('click', this.itemClick.bind(this));
        })
    }

    restore() {
        this.colorPickerBoxList.forEach((item: HTMLElement) => {
            let html = item.children.item(1).children.item(0).innerHTML;
            item.children.item(1).children.item(0).innerHTML = this.colorMap[html] || html;
            item.removeEventListener('click', this.itemClick);
        })
    }
}



