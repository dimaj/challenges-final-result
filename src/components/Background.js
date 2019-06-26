import Tools from "../../lib/Tools.js";

export default class Background extends lng.Component {
    static _template() {
        return {
            Blur: {
                type: lng.components.FastBlurComponent, amount: 2, w: 1920, h: 1080, content: {
                    Background: {
                        w: 1920, h: 1080, alpha: .001
                    }
                }
            }
        };
    }

    _setup() {
        this._background = this.tag("Blur").content.tag("Background");
        this._registerListeners();
    }

    _registerListeners(){
        this._background.on("txLoaded", ()=> {
            this._background.setSmooth("alpha", .15, {duration: .8});
        });
    }

    set item(v){
        this._background.alpha = .001;
        this._background.src = Tools.getImageUrl({path: v.backdrop, width: 'w780'});
    }

}