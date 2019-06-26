export default class Detail {
    constructor(props){
        this._date =  props.release_date;
        this._genres = props.genres;
        this._language = props.original_language;
        this._title = props.original_title;
        this._info = props.overview;
        this._rating = props._vote_average;
        this._votes = props.vote_count;
        this._budget = props.budget;
        this._status = props.status;
        this._vote_average = props.vote_average;
        this._production_companies = props.production_companies;
        this._image = props.poster_path;
    }

    get date(){
        return this._date;
    }

    get genres(){
        return this._genres;
    }

    get language(){
        return this._language;
    }

    get title(){
        return this._title;
    }

    get image(){
        return this._image;
    }

    get info(){
        return this._info;
    }

    get rating(){
        return this._rating;
    }

    get status(){
        return this._status;
    }

    get votes(){
        return this._votes;
    }

    get production_companies() {
        return this._production_companies;
    }

    get budget(){
        return this._budget;
    }

    get vote_average() {
        return this._vote_average;
    }

}