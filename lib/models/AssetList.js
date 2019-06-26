import Asset from "./Asset.js";

export default class AssetList{

    constructor(props, type){
        this._pages = props.total_pages;
        this._results = props.total_results;
        this._type = type;

        if(props.results.length){
            this._assets = props.results.map((data)=>{
                return new Asset(data);
            });
        }
    }

    get pages(){
        return this._pages;
    }

    get results(){
        return this._results;
    }

    get assets(){
        return this._assets;
    }

    get type(){
        return this._type;
    }
}