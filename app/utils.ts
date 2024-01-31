export const rgb2hwb = (rgb) => {
    let [r, g, b] = rgb;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max === min) {
        return {
            h: 0,                     // hue       (from 0 to 360 in degrees)
            w: 100 * min / 255,       // whiteness (from 0 to 100 in %)
            b: 100 - 100 * max / 255  // blackness (from 0 to 100 in %)
        };
    }
    let tmp = 0.0;
    switch (max) {
        case r:
            tmp = (g - b) / (max - min);
            break;
        case g:
            tmp = (b - r) / (max - min) + 2.0;
            break;
        case b:
            tmp = (r - g) / (max - min) + 4.0;
            break;
    }
    const hue = (tmp + 6.0) % 6.0 / 6.0;
    return [
        Math.round(360 * hue),             // hue       (from 0 to 360 in degrees)
        Math.round(100 * min / 255),       // whiteness (from 0 to 100 in %)
        Math.round(100 - 100 * max / 255)  // blackness (from 0 to 100 in %)
    ]
}

export const hex2rgb = (hex: string) => {
    const rgb = [];
    for(let i = 0; i < hex.length; i += 2) {
        rgb.push(parseInt(hex.substring(i, i + 2), 16));
    }
    return rgb;
}

export const hex2opacity = (hex: string) => {
    const opacity = parseInt(hex, 16);
    return Math.round(opacity / 255 * 100) / 100;
}

export const rgb2hsl = (rgb) => {
    let [r, g, b] = rgb;
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
        ? l === r
            ? (g - b) / s
            : l === g
                ? 2 + (b - r) / s
                : 4 + (r - g) / s
        : 0;
    return [
        Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h),
        Math.round(100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)),
        Math.round((100 * (2 * l - s)) / 2),
    ];
};
