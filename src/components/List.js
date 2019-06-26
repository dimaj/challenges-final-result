import Item from "./ItemWrapper.js";

export default class List extends lng.Component {

    static _template() {
        return {
            Items: {
                flex: {direction: "row"},
                forceZIndexContext: true,
                boundsMargin: [500,0,0,0],
                signals:{itemSelect:"_itemSelect"},
                transitions:{x:{duration:0.2}}
            }
        };
    }

    _init() {
        this._index = 0;
        this._lazyLoadedIndex = 1;
        this._chunkSize = 20;
        this._startLoadingAt = 10;
    }

    get active() {
        return this.tag("Items").children[this._index];
    }

    get children(){
        return this.tag("Items").children;
    }

    get tiles() {
        return this._items.tiles;
    }

    set items(v) {
        this._list = v;
        const {assets} = v;
        // if we have children we're updating the list with a new
        // loaded chunk
        if(this.children.length){
            assets.forEach((item)=>{
                this.tag("Items").childList.a({
                    type: Item, item, flexItem: {marginRight: List.space}
                });
            });

            // store for later use
            this._items.push(...assets);
        }else{
            this._items = assets;
            this.patch({
                Items: {
                    children: assets.map(item => {
                        return {type: Item, item, flexItem: {marginRight: List.space}}
                    })
                }
            });
        }
    }

    _focus() {
        this.setIndex(0);
    }

    _handleLeft() {
        if (this._index > 0) {
            this.setIndex(-1);
        }
    }

    _handleRight() {
        if (this._index < this._items.length - 1) {
            this.setIndex(1);
        }
    }

    _handleEnter(){
        this.fireAncestors("$onItemSelect",{
            item:this.active.realItem
        });
    }

    setIndex(direction = 0) {
        this._index += direction;
        this.tag("Items").children.forEach(item => {
            item.setSmooth("flexItem.marginRight", List.space);
        });

        if(this._index > 2){
            this.tag("Items").patch({
                smooth:{
                    x: - (this._index * (this.active.renderWidth + List.space) - 795)
                }
            });
        }else{
            this.tag("Items").setSmooth("x",100);
        }

        if(this._testForLazy()){
            this._setState("LazyLoad");
        }
    }

    _testForLazy(){
        if( this._index && this._index % this._startLoadingAt === 0 ){
            const page = Math.ceil(this._index / this._chunkSize);
            // we're ready to fetch the next list
            if(this._lazyLoadedIndex === page){
                return true;
            }
        }
        return false;
    }

    static _states(){
        return [
            class LazyLoad extends this {
                // always return false when we're in LazyLoad state
                // because we're already loading the next chunk
                _testForLazy(){
                    return false;
                }
                _ready(items){
                    this.items = items;
                    this._lazyLoadedIndex++;
                    this._setState("");
                }
                $enter(){
                    const api = this.fireAncestors("$api");
                    console.log("get new items!")
                    api.fetchByType({type:this._list.type, page:this._lazyLoadedIndex+1}).then((items)=>{
                        this._ready(items);
                    });
                }
                $exit(){
                    // hide loader
                }
            }
        ]
    }

    _getFocused(){
        return this.active;
    }

    static get space() {
        return 64;
    }
}