import Browse from "./browse/Browse.js";
import Background from "./components/Background.js";
import Menu from "./components/Menu.js";
import Tools from "../lib/Tools.js";
import Loader from "./loader/Loader.js";
import Details from "./details/Details.js";

export default class AppContents extends lng.Component {
    static _template(){
        return {
            y: 30,
            Background: {
                type: Background
            },
            Menu: {
                type: Menu, signals:{select:"_select"}
            },
            Movie:{
                type: Browse, alpha: 0
            },
            Tv:{
                type: Browse, alpha: 0
            },
            Details:{
                type: Details, alpha: 0
            },
            Loader:{
                type: Loader, zIndex: 999, alpha:0
            }
        };
    }

    _init() {
        this._setState("Movies");
    }

    _focus() {
        this.patch({
            smooth: {y: [0, {duration: .6}]}
        });
    }

    _unfocus() {
        this.patch({
            smooth: {y: [30, {duration: .6}]}
        });
    }

    syncHomeData(data){
        data.forEach((data)=>{
            this.tag(Tools.ucFirst(data.type)).data = data;
        });
    }

    $onItemSelect({source, item}){
        const api = this.fireAncestors("$api");
        this._setState("Loading");
        api.fetchDetails({category:'movie', id:item.id}).then((data)=>{
            // @todo: remove timeout if you want to,
            // this is just to show loader if request resolves fast
            setTimeout(()=>{
                this.tag("Details").data = data;
                this._setState("Details")
            },1000);
        });
    }

    static _states() {
        return [
            class Menu extends this{
                $enter({prevState}){
                    this._menuReturnState = prevState;
                }
                _getFocused(){
                    return this.tag("Menu");
                }
                _handleDown(){
                    this._setState(this._menuReturnState);
                }
                _select({state}){
                    this.tag(this._stored).setSmooth("alpha",0);
                    this._setState(state);
                }
            },
            class Loading extends this{
                $enter({prevState}){
                    this._appReturnState = prevState;
                    this.tag("Loader").setSmooth("alpha",1);
                }
                $exit(){
                    this.tag("Loader").setSmooth("alpha",0);
                }
            },
            class Details extends this{
                $enter(args){
                    this.tag("Details").setSmooth("alpha",1);
                }
                $exit(args,data){
                    this.tag("Details").setSmooth("alpha",0);
                }
                _handleBack(){
                    this._setState(this._appReturnState);
                }
                _getFocused(){
                    return this.tag("Details");
                }
            },
            class Movies extends this {
                $enter(){
                    this.tag("Movie").setSmooth("alpha",1);
                }
                $exit({newState}){
                    if(newState === "Menu"){
                        this._stored = "Movie";
                        return;
                    }
                    this.tag("Movie").setSmooth("alpha",0);
                }
                _handleUp(){
                    this._setState("Menu");
                }
                _getFocused() {
                    return this.tag("Movie");
                }
                _updatePreview(item){
                    this.tag("Movie").setContent(item);
                }
            },
            class Series extends this {
                $enter(){
                    this.tag("Tv").setSmooth("alpha",1);
                }
                $exit({newState}){
                    if(newState === "Menu"){
                        this._stored = "Tv";
                        return;
                    }
                    this.tag("Tv").setSmooth("alpha",0);
                }
                _handleUp(){
                    this._setState("Menu");
                }
                _getFocused() {
                    return this.tag("Tv");
                }
                _updatePreview(item){
                    this.tag("Tv").setContent(item);
                }
            }
        ]
    }

    $onItemFocus({item}) {
        this.tag("Background").item = item;
        this._updatePreview(item);
    }

    $toggleMenu({visible}){
        this.patch({
            Menu:{
                smooth:{
                    alpha:visible?1:0,
                    y:visible?0:-30
                }
            }
        })
    }


}