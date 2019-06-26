import Tools from "../../lib/Tools.js";

export default class Details extends lng.Component{

    static _template(){
        return {
            w:1920, h:1080, rect: true, color: 0xff000000,
            Wrapper:{ x: 200, y: 300,
                flex: {direction: "row"},
                Image:{
                    flexItem:{marginRight:100}
                },
                Content:{
                    flex: {direction: "column"},
                    Title:{
                        text: {fontSize: 50, fontFace: "Bold"}
                    },
                    Info:{
                        text: {fontSize: 36, wordWrapWidth: 1200, lineHeight: 70, fontFace: "Regular"}
                    }
                }
            }
        }
    }

    set data(v){
        this._item = v;
        const {title, info, image} = v;

        this.patch({
            Wrapper:{
                Image:{
                    src: Tools.getImageUrl({path:image, width: 'w342'})
                },
                Content:{
                    Title:{text:{text:title}},
                    Info:{text:{text:info}}
                }
            }
        });
    }

    _handleEnter(){
        this.fireAncestors("$play",{
            item: this._item
        })
    }
}