export default class Tools {

    static getImageUrl({path, width = 185}) {
        return `//image.tmdb.org/t/p/${width}${path}`
    }

    static ucFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

}