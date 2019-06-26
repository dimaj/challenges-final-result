export default class ListComponent extends lng.components.ListComponent{

    forceState(state){
        this._setState(state);
    }

    static _states(){
        return [
            class Expanded extends this{
                $enter(){
                    const position = 1316 * this.viewportScrollOffset * -1;
                    this.items.forEach((item, idx)=>{
                        if(item !== this._activeItem){
                            item.setSmooth('x', position, {duration:0.4});
                            item.setSmooth("alpha", 0,{duration:0.4});
                        }
                    });
                    this._activeItem.patch({
                        smooth:{
                            y: [-100,{duration:0.3}],
                            x: [position,{duration:0.3}]
                        }
                    });
                }
                $exit(){
                    this.items.forEach((item, idx)=>{
                        if(item !== this._activeItem){
                            item.setSmooth('x', this._restorePosition, {duration:0.2});
                            item.setSmooth("alpha", 1,{duration:0.4,delay:0.2});
                        }
                    });

                    this._activeItem.patch({
                        smooth:{
                            y: [0,{duration:0.3}],
                            x: [this._restorePosition,{duration:0.3}]
                        }
                    });

                }
                _handleBack(){
                    this._setState("");
                    return false;
                }
            }
        ]
    }

}