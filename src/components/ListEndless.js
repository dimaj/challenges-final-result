import Item from "./ItemWrapper.js";

export default class EndlessList extends lng.Component {

    static _template() {
        return {
            Slider: {
                type: lng.components.ListComponent,
                w: 1920,
                h: 417,
                itemSize: 340,
                scrollTransition: {
                    duration: 0.4
                },
                horizontal: true,
                viewportScrollOffset: 0.5,
                itemScrollOffset: 0.5
            }
        };
    }

    set items(v) {
        const {assets} = v;
        this._items = assets;
        const children = assets.map(item => {
            return {type: Item, item}
        });
        this.tag("Slider").items = children;
    }

    get slider(){
        return this.tag("Slider");
    }

    get children(){
        return this.slider.items;
    }

    get active() {
        return this.children[this.slider.realIndex];
    }

    get tiles() {
        return this._items.tiles;
    }

    _handleLeft() {
        this.slider.setPrevious();
    }

    _handleRight() {
        this.slider.setNext();
    }

    _handleEnter(){
        this.fireAncestors("$onItemSelect",{
            item:this.active.realItem
        });
    }

    _getFocused(){
        return this.active;
    }
}