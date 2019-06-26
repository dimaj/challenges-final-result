import App from "../App.js";

export default class Loader extends lng.Component{

    static _template(){
        return {
            w: 1920, h: 1080, rect: true, color: 0xff000000,
            Spinner:{
                mount:0.5, x:960, y: 540, src: App.getPath("images/spinner.png")
            }
        }
    }

    _init(){
        this._spin = this.tag("Spinner").animation({
            duration:2, repeat:-1, actions:[
                {p:'rotation', v:{0:0,1:Math.PI*2}}
            ]
        });
    }

    _active(){
        this._spin.start();
    }

    _inactive(){
        this._spin.stop();
    }
}