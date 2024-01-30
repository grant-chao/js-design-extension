import { storage } from "~app/storage";

class Helper {
    init() {
        storage.get("outputs").then((outputs) => {
            console.log(outputs);
        });
        const root = document.getElementById('root');
        if(!root) return;
        const observer = new MutationObserver((list, observer) => {
            const panel = document.getElementById('editRightPanel');
            if(panel) { // panel is ready
                console.log('panel is ready');
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
            const list = this.getColorPickerBox(panel);
            this.hackPickerBox(list);
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
        console.log(e.target);
    }

    hackPickerBox(list: HTMLElement[]) {
        list.forEach((item: HTMLElement) => {
            item.children.item(1).children.item(0).innerHTML = 'var(--test)';
            item.removeEventListener('click', this.itemClick);
            item.addEventListener('click', this.itemClick);
        })
    }
}

const helper = new Helper();
helper.init();



