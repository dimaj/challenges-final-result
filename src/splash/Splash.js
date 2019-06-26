import App from "../App.js";

export default class Splash extends lng.Component{
    static _template() {
        return {
            Blur: {
                type: lng.components.FastBlurComponent, amount: 4, w: 1920, h: 1080,
                content: {
                    Glow: {
                        color: 0x40ffffff
                    }
                }
            },
            Render: {
                rtt: true, w: 1920, h: 1080,
                Lines: {
                    rotation: Math.PI * -.25, mount: .5, y: 540,
                    LineOne: {
                        y: 100,
                        texture: lng.Tools.getRoundRect(800, 30, 15, 0, 0x00ffffff, true, 0xff01d277)
                    },
                    LineTwo: {
                        y: 500,
                        texture: lng.Tools.getRoundRect(300, 30, 15, 0, 0x00ffffff, true, 0xff01d277)
                    },
                    LineThree: {
                        y: 600,
                        texture: lng.Tools.getRoundRect(400, 30, 15, 0, 0x00ffffff, true, 0xff01d277)
                    },
                    LineFour: {
                        y: 1080,
                        texture: lng.Tools.getRoundRect(800, 30, 15, 0, 0x00ffffff, true, 0xff01d277)
                    },
                    LineFive: {
                        y: 1280, mountX: 1,
                        texture: lng.Tools.getRoundRect(600, 30, 15, 0, 0x00ffffff, true, 0xff01d277)
                    }
                },
                // @todo: png
                Logo: {
                    mount: .5, x: 960, y: 540, alpha: 0.001, color: 0xff01d277,
                    texture: lng.Tools.getSvgTexture(App.getPath('images/tmdb-logo.svg'), 600, 500)
                }
            }
        }
    }

    _init() {
        this.tag("Blur").content.tag("Glow").texture = this.tag("Render").getTexture();
        this._initAnimations();
        this._registerListeners();
        this._startAnimation.start();
    }

    _registerListeners(){
        this._finishAnimation.on("progress", (e)=> {
            if (e > 0.5 && !this._fired) {
                this._fired = true;
                this.fireAncestors("$finished")
            }
        });
    }

    _initAnimations(){
        this._startAnimation = this.animation({duration: 2, actions: [
            {t: 'LineOne', p: 'x', sm: .5, v: {0: -1300, .7: 700}},
            {t: 'LineTwo', p: 'x', sm: .4, v: {0: -2400, .7: -400}},
            {t: 'LineThree', p: 'x', sm: .5, v: {0: -2300, .9: -300}},
            {t: 'LineFour', p: 'x', sm: .3, v: {0: -620, .8: 1380}},
            {t: 'LineFive', p: 'x', sm: .4, v: {0: -320, .9: 1680}},
            {t: 'Logo', p: 'alpha', sm: 1, v: {0: 0.001, .3: 1}}
        ]});

        this._finishAnimation = this.animation({duration: 2, actions: [
            {t: 'LineOne', p: 'x', sm: .5, v: {0: 700, .7: 2700}},
            {t: 'LineTwo', p: 'x', sm: .4, v: {0: -400, .7: 1600}},
            {t: 'LineThree', p: 'x', sm: .5, v: {0: -300, .9: 1700}},
            {t: 'LineFour', p: 'x', sm: .3, v: {0: 1380, .8: 3380}},
            {t: 'LineFive', p: 'x', sm: .4, v: {0: 1680, .9: 3680}},
            {t: 'Logo', p: 'alpha', sm: 1, v: {0: 1, .2: 0}}
        ]});
    }

    finishSplash() {
        this._finishAnimation.start();
    }
}