const cmykCInput = document.getElementById("cmyk-c");
const cmykCSlider = document.getElementById("cmyk-c-slider");
const cmykMInput = document.getElementById("cmyk-m");
const cmykMSlider = document.getElementById("cmyk-m-slider");
const cmykYInput = document.getElementById("cmyk-y");
const cmykYSlider = document.getElementById("cmyk-y-slider");
const cmykKInput = document.getElementById("cmyk-k");
const cmykKSlider = document.getElementById("cmyk-k-slider");

const rgbRInput = document.getElementById("rgb-r");
const rgbRSlider = document.getElementById("rgb-r-slider");
const rgbGInput = document.getElementById("rgb-g");
const rgbGSlider = document.getElementById("rgb-g-slider");
const rgbBInput = document.getElementById("rgb-b");
const rgbBSlider = document.getElementById("rgb-b-slider");

const hlsHInput = document.getElementById("hls-h");
const hlsHSlider = document.getElementById("hls-h-slider");
const hlsLInput = document.getElementById("hls-l");
const hlsLSlider = document.getElementById("hls-l-slider");
const hlsSInput = document.getElementById("hls-s");
const hlsSSlider = document.getElementById("hls-s-slider");

const rgbColorPicker = document.getElementById("rgb-color-picker");

function RGBtoCMYK() {
    let r = document.getElementById("rgb-r").value;
    let g = document.getElementById("rgb-g").value;
    let b = document.getElementById("rgb-b").value;
    let k = 1 - Math.max(r / 255, g / 255, b / 255);
    document.getElementById("cmyk-k").value = Math.round(k * 100) / 100;
    if (Math.abs(k - 1) < 1e-6) {
        document.getElementById("cmyk-c").value = 0;
        document.getElementById("cmyk-m").value = 0;
        document.getElementById("cmyk-y").value = 0;
    } else {
        document.getElementById("cmyk-c").value = Math.round((1 - r / 255 - k) / (1 - k) * 100) / 100;
        document.getElementById("cmyk-m").value = Math.round((1 - g / 255 - k) / (1 - k) * 100) / 100;
        document.getElementById("cmyk-y").value = Math.round((1 - b / 255 - k) / (1 - k) * 100) / 100;
    }
    document.getElementById("cmyk-c-slider").value = document.getElementById("cmyk-c").value;
    document.getElementById("cmyk-m-slider").value = document.getElementById("cmyk-m").value;
    document.getElementById("cmyk-y-slider").value = document.getElementById("cmyk-y").value;
    document.getElementById("cmyk-k-slider").value = document.getElementById("cmyk-k").value;
}

function CMYKtoRGB() {
    let k = document.getElementById("cmyk-k").value;
    let c = document.getElementById("cmyk-c").value;
    let m = document.getElementById("cmyk-m").value;
    let y = document.getElementById("cmyk-y").value;
    if (k === 1) {
        document.getElementById("rgb-r").value = 0;
        document.getElementById("rgb-g").value = 0;
        document.getElementById("rgb-b").value = 0;
    } else {
        document.getElementById("rgb-r").value = Math.round((1 - c) * 255 * (1 - k));
        document.getElementById("rgb-g").value = Math.round((1 - m) * 255 * (1 - k));
        document.getElementById("rgb-b").value = Math.round((1 - y) * 255 * (1 - k));
    }
    document.getElementById("rgb-r-slider").value = document.getElementById("rgb-r").value;
    document.getElementById("rgb-g-slider").value = document.getElementById("rgb-g").value;
    document.getElementById("rgb-b-slider").value = document.getElementById("rgb-b").value;
}

function RGBtoHLS() {
    let r = document.getElementById("rgb-r").value;
    let g = document.getElementById("rgb-g").value;
    let b = document.getElementById("rgb-b").value;
    const max = Math.max(r, g, b) / 255;
    const min = Math.min(r, g, b) / 255;
    const l = (max + min) / 2;
    let h, s;
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r / 255:
                h = (g / 255 - b / 255) / d;
                if (h < 0) {
                    h += 6;
                }
                break;
            case g / 255:
                h = (b / 255 - r / 255) / d + 2;
                break;
            case b / 255:
                h = (r / 255 - g / 255) / d + 4;
                break;
        }
        h *= 60;
    }
    document.getElementById("hls-h").value = Math.round(h);
    document.getElementById("hls-l").value = Math.round(l * 100) / 100;
    document.getElementById("hls-s").value = Math.round(s * 100) / 100;
    document.getElementById("hls-h-slider").value = Math.round(h);
    document.getElementById("hls-l-slider").value = Math.round(l * 100) / 100;
    document.getElementById("hls-s-slider").value = Math.round(s * 100) / 100;
}

function HLStoRGB() {
    let h = document.getElementById("hls-h").value;
    let l = document.getElementById("hls-l").value;
    let s = document.getElementById("hls-s").value;
    let r, g, b;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const m = l - c / 2;
    if (s === 0) {
        r = g = b = 0;
    } else {
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        switch (Math.round(h / 60)) {
            case 0: {
                r = c;
                g = x;
                b = 0;
                break
            }
            case 1: {
                r = x;
                g = c;
                b = 0;
                break
            }
            case 2: {
                r = 0;
                g = c;
                b = x;
                break
            }
            case 3: {
                r = 0;
                g = x;
                b = c;
                break
            }
            case 4: {
                r = x;
                g = 0;
                b = c;
                break
            }
            case 5: {
                r = c;
                g = 0;
                b = x;
            }
        }
    }
    document.getElementById("rgb-r").value = Math.round((r + m) * 255);
    document.getElementById("rgb-g").value = Math.round((g + m) * 255);
    document.getElementById("rgb-b").value = Math.round((b + m) * 255);
    document.getElementById("rgb-r-slider").value = document.getElementById("rgb-r").value;
    document.getElementById("rgb-g-slider").value = document.getElementById("rgb-g").value;
    document.getElementById("rgb-b-slider").value = document.getElementById("rgb-b").value;
}

function updateColor() {
    let r = document.getElementById("rgb-r").value;
    let g = document.getElementById("rgb-g").value;
    let b = document.getElementById("rgb-b").value;
    document.getElementById("color-preview").style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    let hexR = Number(r).toString(16).padStart(2, '0');
    let hexG = Number(g).toString(16).padStart(2, '0');
    let hexB = Number(b).toString(16).padStart(2, '0');

    document.getElementById("rgb-color-picker").value = `#${hexR}${hexG}${hexB}`;
}

cmykCSlider.addEventListener("input", function () {
    cmykCInput.value = cmykCSlider.value;
    CMYKtoRGB();
    RGBtoHLS();
    updateColor();
});

cmykMSlider.addEventListener("input", function () {
    cmykMInput.value = cmykMSlider.value;
    CMYKtoRGB();
    RGBtoHLS();
    updateColor();
});

cmykYSlider.addEventListener("input", function () {
    cmykYInput.value = cmykYSlider.value;
    CMYKtoRGB();
    RGBtoHLS();
    updateColor();
});

cmykKSlider.addEventListener("input", function () {
    cmykKInput.value = cmykKSlider.value;
    CMYKtoRGB();
    RGBtoHLS();
    updateColor();
});

cmykCInput.addEventListener("input", function () {
    cmykCSlider.value = cmykCInput.value;
    CMYKtoRGB();
    RGBtoHLS();
    updateColor();
});

cmykMInput.addEventListener("input", function () {
    cmykMSlider.value = cmykMInput.value;
    CMYKtoRGB();
    RGBtoHLS();
    updateColor();
});

cmykYInput.addEventListener("input", function () {
    cmykYSlider.value = cmykYInput.value;
    CMYKtoRGB();
    RGBtoHLS();
    updateColor();
});

cmykKInput.addEventListener("input", function () {
    cmykKSlider.value = cmykKInput.value;
    CMYKtoRGB();
    RGBtoHLS();
    updateColor();
});

rgbRInput.addEventListener("input", function () {
    rgbRSlider.value = rgbRInput.value;
    RGBtoHLS();
    RGBtoCMYK();
    updateColor();
});

rgbGInput.addEventListener("input", function () {
    rgbGSlider.value = rgbGInput.value;
    RGBtoHLS();
    RGBtoCMYK();
    updateColor();
});

rgbBInput.addEventListener("input", function () {
    rgbBSlider.value = rgbBInput.value;
    RGBtoHLS();
    RGBtoCMYK();
    updateColor();
});

rgbRSlider.addEventListener("input", function () {
    rgbRInput.value = rgbRSlider.value;
    RGBtoHLS();
    RGBtoCMYK();
    updateColor();
});

rgbGSlider.addEventListener("input", function () {
    rgbGInput.value = rgbGSlider.value;
    RGBtoHLS();
    RGBtoCMYK();
    updateColor();
});

rgbBSlider.addEventListener("input", function () {
    rgbBInput.value = rgbBSlider.value;
    RGBtoHLS();
    RGBtoCMYK();
    updateColor();
});

hlsHSlider.addEventListener("input", function () {
    hlsHInput.value = hlsHSlider.value;
    HLStoRGB();
    RGBtoCMYK();
    updateColor();
});

hlsLSlider.addEventListener("input", function () {
    hlsLInput.value = hlsLSlider.value;
    HLStoRGB();
    RGBtoCMYK();
    updateColor();
});

hlsSSlider.addEventListener("input", function () {
    hlsSInput.value = hlsSSlider.value;
    HLStoRGB();
    RGBtoCMYK();
    updateColor();
});

hlsHInput.addEventListener("input", function () {
    hlsHSlider.value = hlsHInput.value;
    HLStoRGB();
    RGBtoCMYK();
    updateColor();
});

hlsLInput.addEventListener("input", function () {
    hlsLSlider.value = hlsLInput.value;
    HLStoRGB();
    RGBtoCMYK();
    updateColor();
});

hlsSInput.addEventListener("input", function () {
    hlsSSlider.value = hlsSInput.value;
    HLStoRGB();
    RGBtoCMYK();
    updateColor();
});


rgbColorPicker.addEventListener("input", function () {
    const selectedColor = rgbColorPicker.value;

    const colorWithoutHash = selectedColor.substring(1);

    const rHex = colorWithoutHash.substring(0, 2);
    const gHex = colorWithoutHash.substring(2, 4);
    const bHex = colorWithoutHash.substring(4, 6);

    const r = parseInt(rHex, 16);
    const g = parseInt(gHex, 16);
    const b = parseInt(bHex, 16);
    rgbRInput.value = rgbRSlider.value = r;
    rgbGInput.value = rgbGSlider.value = g;
    rgbBInput.value = rgbBSlider.value = b;
    RGBtoCMYK();
    RGBtoHLS();
    updateColor();
});

updateColor();
