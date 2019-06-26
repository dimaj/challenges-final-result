import Tools from "../../lib/Tools.js";
import App from "../App.js";

export default class Item extends lng.Component {
    static _template() {
        return {
            w: Item.width, h: Item.height, rtt: true,
            shader: {type: lng.shaders.Light3d, ry: 0, rx: 0, fudge: 0.5, ambient: 0.6, strength: 0.08, lightZ: 50, lightY: 50, focusedZ: 1},
            Poster: {
                w: w=>w, h: h=>h,
            },
            Border: {
                w: w=>w, h: h=>h,
                Top: {w: w=>w, rect: true},
                Left: {h: h=>h, rect: true},
                Right: {h: h=>h, x: w=>w, mountX: 1, rect: true},
                Bottom: {w: w=>w, y: h=>h, mountY: 1, rect: true}
            }
        }
    }

    _init() {
        const api = this.fireAncestors("$api");
        this._offline = api.offline;

        this._focusAnimation = this.animation({duration: .3, actions: [
            {t: '', p: 'shader.ambient', v: {0: .6, .5: .6, 1: .8}},
            {t: '', p: 'shader.rx', v: {0: 0, .5: Math.PI * .08, 1: 0}},
            {t: '', p: 'scale', v: {0: 1, 1: 1.15}}
        ]});
    }

    set item(v) {
        this._item = v;

        const {image} = v;
        let src = null;

        if(this._offline){
            src = App.getPath(`assets${image}`);
        }else{
            src = Tools.getImageUrl({path:image, width: 'w342'});
        }
        this.tag("Poster").src = src;
    }

    get item() {
        return this._item;
    }

    _focus() {
        this._updateBorder(10);
        this._focusAnimation.start();

        this.fireAncestors("$onItemFocus", {item: this._item});
    }

    _unfocus() {
        this._updateBorder();
        this._focusAnimation.stop();
    }

    _updateBorder(size=0){
        this.tag("Border").patch({
            Top: {smooth: {h: size}},
            Left: {smooth: {w: size}},
            Right: {smooth: {w: size}},
            Bottom: {smooth: {h: size}}
        });
    }

    static get width() {
        return 300;
    }

    static get height() {
        return 450;
    }
}
