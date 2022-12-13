import React, {Dispatch, FC, SetStateAction, useRef, useState} from 'react';
import s from './Modal.module.css'

interface ModalProps {
    component: React.ReactNode,
    setIsActive: Dispatch<SetStateAction<boolean>>,
    isActive: boolean
}

const Modal: FC<ModalProps> = ({component, setIsActive, isActive}) => {
    let [shouldOut, setShouldOut] = useState(false)
    let background = useRef(null)
    let closeHandler = (e: React.MouseEvent) => {
        if(e.target === background.current) {
            setShouldOut(true)
            setIsActive(false)
        }
    }
    return (
        <div className={s.content + ' ' + (isActive ? s.active : '') + (shouldOut && !isActive ? s.out : '')} ref={background} onClick={closeHandler}>
            {component}
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                 x="0px" y="0px"
                 onClick={() => {
                     setShouldOut(true)
                     setIsActive(false)
                 }}
                 id={s.modalCloseIcon}
                 width="612.043px" height="612.043px" viewBox="0 0 612.043 612.043">
                <g>
                    <g id="cross">
                        <g>
                            <path d="M397.503,306.011l195.577-195.577c25.27-25.269,25.27-66.213,0-91.482c-25.269-25.269-66.213-25.269-91.481,0
                            L306.022,214.551L110.445,18.974c-25.269-25.269-66.213-25.269-91.482,0s-25.269,66.213,0,91.482L214.54,306.033L18.963,501.61
                            c-25.269,25.269-25.269,66.213,0,91.481c25.269,25.27,66.213,25.27,91.482,0l195.577-195.576l195.577,195.576
                            c25.269,25.27,66.213,25.27,91.481,0c25.27-25.269,25.27-66.213,0-91.481L397.503,306.011z"/>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default Modal;