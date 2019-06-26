export default class Menu extends lng.Component{
    static _template(){
        return {
            Items: {
                flex: {},
                mountX: .5, x: 960, y: 96
            }
        }
    }

    _init(){
        this._index = 0;
        this._activeIndex = 0;
        this.tag("Items").children = [
            {ref:"Movies",label:"Movies",marginRight:100},
            {ref:"Series",label:"Series",marginRight: 0},
        ].map(item=>{
            return {type:MenuItem, item}
        });
    }

    get items(){
        return this.tag("Items").children;
    }

    get active(){
        return this.tag("Items").children[this._index];
    }

    _handleEnter() {
        this.signal("select",{
            state: this.active.ref
        })
    }


    _handleLeft(){
        if(this._index > 0){
            this._select(this._index-1);
            this._activeIndex = this._index;
            this.signal("loadPage",{ref:this.active.ref});
        }
    }

    _handleRight(){
        if(this._index < this.items.length - 1){
            this._select(this._index+1);
            this._activeIndex = this._index;
            this.signal("loadPage",{ref:this.active.ref});
        }
    }

    _select(index=this._index){
        this._index = index;
    }

    loadPage(index) {
        this._index = index;
        this._select(this._index);
        this._activeIndex = this._index;
        this.signal("loadPage",{ref:this.active.ref});
    }

    _getFocused(){
        return this.active;
    }

}

class MenuItem extends lng.Component{
    static _template(){
        return {
            color: 0x50c3c3c3, text:{text:"", fontFace: "Regular", fontSize:78}
        }
    }

    _focus(){
        this.patch({
            smooth: {color: [0xffffffff, {duration: .4}]}
        })
    }

    _unfocus(){
        this.patch({
            smooth: {color: [0x50c3c3c3, {duration: .4}]}
        })
    }

    set item(v){
        this._item = v;

        this.patch({
            flexItem: {marginRight: v.marginRight},
            text: {text: v.label}
        });
    }

    get ref(){
        return this._item.ref
    }
}