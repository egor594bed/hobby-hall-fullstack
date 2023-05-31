import React, { FC, memo } from 'react'
import {ReactComponent as FavoriteLogo} from '../../../assets/img/favorite-icon.svg';
import classes from './MyFavorite.module.scss'

interface IMyFavorite {
    favoriteHandler(e: React.MouseEvent<SVGSVGElement, MouseEvent>): void
    isFavorite: boolean
}

const MyFavorite:FC<IMyFavorite> = memo(({favoriteHandler, isFavorite}) => {

    return (
        <div className={classes.MyFavorite}>
            <FavoriteLogo className={classes.FavoriteSVG + " " + ((isFavorite) ? classes.isFavorite : '')} onClick={e => favoriteHandler(e)}></FavoriteLogo>
        </div>
    )
})

export default MyFavorite
