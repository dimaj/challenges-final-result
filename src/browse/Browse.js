
import ListEndless from "../components/ListEndless.js";
import List from "../components/List.js";

export default class Browse extends lng.Component {
    static _template() {
        return {
            List: {
                type: List, mountX: .5, x: 16, y: 284
            },
            Content: {
                flex: {direction: "column"},
                x: 960, alpha: 0,
                Title: {
                    mountX: .5,
                    text: {fontSize: 70, fontFace: "Bold"}
                },
                Description: {
                    mountX: .5, color: 0xffc3c3c3,
                    text: {fontSize: 36, textAlign: "center", maxLines: 2, wordWrapWidth: 1080, lineHeight: 52, fontFace: "Regular"}
                }
            }
        }
    }

    set data(data){
        this.tag("List").items = data
    }

    setContent({title, info}) {
        this.tag("Content").y = 830;
        this.tag("Content").alpha = 0;

        this.patch({
            Content: {
                smooth: {y: [800, {duration: .6}], alpha: [1, {duration: .6}]},
                Title: {
                    text: {text: title}
                },
                Description: {
                    text: {text: info}
                }
            }
        });
    }

    _getFocused() {
        return this.tag("List");
    }
}