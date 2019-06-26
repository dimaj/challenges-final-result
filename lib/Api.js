import AssetList from "./models/AssetList.js";
import Detail from "./models/Detail.js";


//@todo: fixed urls for movie and tv
export default class Api {

    constructor() {
        this._apiKey = '66683917a94e703e14ca150023f4ea7c';
        this._base = 'https://api.themoviedb.org/3';
        this._offline = false;
    }

    boot(){
        const promises = [
            this.fetchByType({type:"movie"}),
            this.fetchByType({type:"tv"}),
        ];
        return Promise.all(promises);
    }

    /**
     *
     * @param type - (movie | tv)
     * @returns {AssetList}
     */
    fetchByType({type,page=1}) {
        let url = `${this._base}/${type}/popular`;

        if(this._offline){
            url = './data/movies.json';
        }

        return this.get(url,page).then((data) => {
            return new AssetList(data, type);
        });
    }

    /**
     * Stubbed lazyload
     * @returns {[]}
     */
    lazyload(){
        return this.get('./data/movies.json').then((data)=>{
            return new AssetList(data);
        });
    }

    /**
     * @param category
     * @param id
     * @returns {PromiseLike<T | never> | Promise<T | never>}
     */
    fetchDetails({category, id}) {
        let url = `${this._base}/${category}/${id}`;
        if(this._offline){
            url = './data/detail.json'
        }

        return this.get(url).then((data)=>{
            return new Detail(data);
        });
    }

    get(url, page) {
        const params = {
            api_key: this._apiKey
        };
        if(page){
            params.page = page;
        }
        return fetch(`${url}?${Api._qsify(params)}`, {
            'Accept': 'application/json'
        }).then(response => {
            if (!response.ok) throw "Response not ok";
            return response.json();
        }).catch(error => {
            console.error('Error loading ' + url, error);
            throw error;
        })
    }

    requestTrailer(id) {
        let url = 'https://www.googleapis.com/youtube/v3/videos?id=' + id + '&fields=items(snippet)&part=snippet&key=AIzaSyB71qOU9MjNL8lauo_TWprrsPKmiQ5ud64';

        return fetch(url, {
            'Accept': 'application/json'
        }).then(response => {
            if (!response.ok) throw "Response not ok";
            return response.json();
        }).catch(error => {
            console.error('Error loading ' + url, error);
            throw error;
        })
    }

    get offline(){
        return this._offline;
    }

    static _qsify(params) {
        return Object.keys(params).map((key) => {
            return `${key}=${params[key]}`;
        }).join("&");
    }
}