import React, { FC } from 'react'
import { memo } from 'react'
import cl from './MyCounter.module.scss'

interface IMyCounter {
    setCounter(counter: number): void
    counter: number
}

const MyCounter: FC<IMyCounter> = memo(({setCounter, counter}) => {

    function increase() {
        setCounter(counter + 1)
    }

    function decrease() {
        setCounter(counter - 1)
    }


    return (
        <div className={cl.MyCounterWrapper}>
            <button className={cl.MyCounterButton} onClick={decrease}>-</button>
            <input className={cl.MyCounterInput} onChange={(e) => setCounter(Number(e.target.value))} type='number' value={counter}></input>
            <button className={cl.MyCounterButton} onClick={increase}>+</button>
        </div>
    )
})

export default MyCounter
