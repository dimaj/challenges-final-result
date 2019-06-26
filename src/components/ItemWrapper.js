import Item from "./Item.js";

export default class ItemWrapper extends lng.Component {
    static _template() {
        return {
            w: Item.width,
            h: Item.height
        };
    }

    set construct(v){
        this._construct = v;
    }

    set item(obj) {
        this._item = obj;
    }

    get item() {
        return this._item;
    }

    get realItem(){
        return this.child.item;
    }

    get child(){
        return this.children[0];
    }

    create() {
        const item = this._item;

        this.children = [{
            type: Item, item
        }];

        // if item is flagged and has focus, notify parent
        // that focuspath can be recalculated
        if(this._notifyOnItemCreation && this.hasFocus()){
            this._refocus();
        }
    }

    _firstActive() {
        this.create();

        if(!ItemWrapper.FIRST_CREATED){
            this.fireAncestors("$firstItemCreated");
            ItemWrapper.FIRST_CREATED = true;
        }
        // console.log("created");
    }

    _getFocused() {
        // due to lazy creation there is the possibility that
        // an component receives focus before the actual item
        // is created, therefore we set a flag
        if(!this.child){
            this._notifyOnItemCreation = true;
        }else{
            return this.child;
        }

    }
}

ItemWrapper.FIRST_CREATED = false;