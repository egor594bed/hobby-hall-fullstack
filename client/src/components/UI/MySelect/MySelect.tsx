import React, { FC, memo } from 'react'
import cl from './MySelect.module.scss'

interface IMySelect {
    onChange(e: number | string): void
    data: IMySelectItem[]
}

interface IMySelectItem {
    id: string | number
    name: string
}

const MySelect: FC<IMySelect> = memo(({onChange, ...props}) => {

    return (
        <select className={cl.MySelect} onChange={e => onChange(e.target.value)}>
            <option value='none'>--Выберите способ--</option>
            {
                props.data.map((elem) => {
                    return <option value={elem.id} key={elem.id}>{elem.name}</option>
                })
            }
        </select>
    )
})

export default MySelect
