const storageName = 'favoriteProducts'

class FavoriteService {

    toggleFavoriteId(id: string) {
        if(!localStorage.getItem(storageName)) localStorage.setItem(storageName, '[]')
        let favoritsArr =  this.getFavoriteIds()


        if(favoritsArr.includes(id)) {
            this.removeFavoriteId(id)
        }else {
            this.addFavoriteId(id)
        }
    }

    isFavorite(id: string) {
        let favoritsArr =  this.getFavoriteIds()
        if(!favoritsArr) return false
        return (favoritsArr.includes(id)) ? true : false
    }

    private removeFavoriteId(id: string) {
        let favoritsArr =  this.getFavoriteIds()

        let newfavoritsArr = favoritsArr.filter((elemID: string) => {
            if(elemID === id) return false
            return true
        })

        this.saveFavoriteIds(newfavoritsArr)
    }

    private addFavoriteId(id: string) {
        let favoritsArr =  this.getFavoriteIds()

        favoritsArr.push(id)
        this.saveFavoriteIds(favoritsArr)
    }

    private getFavoriteIds() {
        return JSON.parse(localStorage.getItem(storageName) as string)
    }

    private saveFavoriteIds(newFavoritsArr: string[]) {
        localStorage.setItem(storageName, JSON.stringify(newFavoritsArr))
    }
}

export default new FavoriteService()