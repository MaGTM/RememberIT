import React, {useContext, useEffect, useState} from 'react';
import s from './PlayDesk.module.css'
import {ContextApp} from "../store/reducers";

const PlayDesk = () => {
    const TIMER_TIME = 800
    let {state} = useContext(ContextApp)
    let [randomNumbers, setRandomNumbers] = useState<number[]>([])
    let [answer, setAnswer] = useState<number[]>([])
    let [result, setResult] = useState<boolean | null>(null)

    let [playDesk, setPlayDesk] = useState<{ id: number, status: string }[]>([])
    let playBlocks: JSX.Element[] = []

    let [start, setStart] = useState(false)
    let [isShowing, setIsShowing] = useState(false)

    let [attempt, setAttempt] = useState(state.app.settings?.startingPoint!)

    // Функция, которая срабатывает при нажатии на SPAN, при условии, что сейчас не идет процесс показа последовательности
    let answerHandler = (id: number) => {
        if (answer.length < (attempt + 2) && !isShowing && start) {
            setPlayDesk(prevState => {
                return prevState.map(item => {
                    if (item.id === id) {
                        return {id: item.id, status: 'active'}
                    }
                    return item
                })
            })
            let clearClass = setTimeout(() => {
                setPlayDesk(prevState => {
                    return prevState.map(item => {
                        if (item.id === id) {
                            return {id: item.id, status: 'none'}
                        }
                        return item
                    })
                })
            }, 300)
            if (attempt + 1 === answer.length) {
                clearTimeout(clearClass)
            }
            setAnswer(prevState => {
                return [
                    ...prevState,
                    id
                ]
            })
        }
    }

    // Заполнение доски элементами SPAN
    for (let i = 0; i < 16; i++) {
        playBlocks.push(<span onClick={() => answerHandler(i)}
                              className={[
                                  playDesk[i]?.status === 'active' ? s.active : '',
                                  playDesk[i]?.status === 'wrong' ? s.wrong : '',
                                  playDesk[i]?.status === 'correct' ? s.correct : ''
                              ].join('')}
                              key={i}
                              style={{cursor: (start && !isShowing && result === null) ? 'pointer' : 'default'}}
        />)
    }

    // Заполнение массива рандомными числами
    let randomNumbersHandler = () => {
        let localArray: number[] = []
        for (let i = 0; i < (attempt + 2); i++) {
            let number = Math.floor(Math.random() * 16)
            localArray.push(number)
        }
        setRandomNumbers(localArray)
    }


    // Функция, которая срабатывает при нажатии на кнопку START и STOP
    let startHandler = () => {
        if (!start) {                                           // START
            setStart(true)
            randomNumbersHandler()
        } else {                                                // STOP
            setStart(false)
            setIsShowing(false)
            setAttempt(state.app.settings?.startingPoint!)
            clearPlayDesk()
        }
    }

    // Очистка доски
    let clearPlayDesk = () => {
        setAnswer([])
        setResult(null)
        if (!start) {
            for (let i = 0; i < 16; i++) {
                setPlayDesk(prevState => {
                    return [
                        ...prevState,
                        {id: i, status: 'none'}
                    ]
                })
            }
        } else {
            setPlayDesk(prevState => {
                return prevState.map((item) => {
                    return {id: item.id, status: 'none'}
                })
            })
        }
    }

    // Действия при правильном ответе
    let correctAnswerHandler = () => {
        setIsShowing(true)
        setPlayDesk(prevState => {
            return prevState.map((item) => {
                return {id: item.id, status: 'correct'}
            })
        })

        setTimeout(() => {
            randomNumbersHandler()
            clearPlayDesk()
        }, 2000)
    }

    // Действия при неверном ответе
    let wrongAnswerHandler = () => {
        setIsShowing(true)
        setPlayDesk(prevState => {
            return prevState.map((item) => {
                return {id: item.id, status: 'wrong'}
            })
        })
        setTimeout(() => {
            clearPlayDesk()
            setStart(false)
            setIsShowing(false)
            setRandomNumbers([])
            setAttempt(state.app.settings?.startingPoint!)
        }, 2000)
    }

    // Показ блоков
    useEffect(() => {
        let seconds = -1
        let showClock = setTimeout(function tick() {
            if (start && isShowing && result === null) {
                setPlayDesk(prevState => {
                    return prevState.map((stateItem) => {
                            if (stateItem.id === randomNumbers[seconds]) {
                                return {id: stateItem.id, status: 'active'}
                            }
                            return stateItem
                        }
                    )
                })
                setTimeout(() => {
                    setPlayDesk(prevState => {
                        return prevState.map((stateItem) => {
                                return {id: stateItem.id, status: 'none'}
                            }
                        )
                    })
                }, 500)
                showClock = isShowing ? setTimeout(tick, TIMER_TIME) : setTimeout(() => {
                }, 0)
                if (seconds === attempt + 2) {
                    clearTimeout(showClock)
                    setTimeout(() => {
                        setIsShowing(false)
                    }, 600)
                }
                seconds++
            }
        }, TIMER_TIME)

        return () => clearTimeout(showClock)
    }, [isShowing, result])

    useEffect(() => {
        if (start) {
            setIsShowing(true)
            return
        }
    }, [start])

    // Проверка на ответ
    useEffect(() => {
        if (answer.length === attempt + 2) {
            let isCorrect = null
            for (let i = 0; i < (attempt + 2); i++) {
                isCorrect = randomNumbers[i] === answer[i];
                if(!isCorrect) break
            }
            if (isCorrect) {
                setAttempt(attempt + 1)
            } else {
                setAttempt(state.app.settings?.startingPoint!)
            }
            setResult(isCorrect)
        }
    }, [answer])

    useEffect(() => {
        if (result) {
            correctAnswerHandler()
        } else if (result === false) {
            wrongAnswerHandler()
        }
    }, [result])

    // Сетаем первоначальное состояние доски и рандомных чисел
    useEffect(() => {
        clearPlayDesk()
    }, [])

    useEffect(() => {
        if(!start && !isShowing && result === null) {
            setAttempt(state.app.settings?.startingPoint!)
        }
    }, [state.app.settings?.startingPoint, result])

    // RENDER
    return (
        <div className={s.content}>
            <div className={s.mainDesk}>
                {playBlocks}
            </div>
            <span
                className={s.indicator}>{((isShowing && start && result === null) && 'Remember') || ((!isShowing && start) && 'GO')}</span>
            <button onClick={startHandler}>{start ? 'STOP' : 'START'}</button>
            <div id={s.attemptsIndicator}>
                <h2>Attempt</h2>
                <span>{attempt}</span>
            </div>
        </div>
    );
};

export default PlayDesk;