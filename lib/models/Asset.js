export default class Asset{
    constructor(props){

        this._backdrop = props.backdrop_path;
        this._id = props.id;
        this._title = props.original_title || props.original_name;
        this._info = props.overview;
        this._image = props.poster_path;
    }

    get backdrop(){
        return this._backdrop;
    }

    get id(){
        return this._id;
    }

    get title(){
        return this._title;
    }

    get info(){
        return this._info;
    }

    get image(){
        return this._image;
    }
}




