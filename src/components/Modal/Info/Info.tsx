import React from 'react';
import s from './Info.module.css'

const Info = () => {

    return (
        <div className={s.content}>
            <p>1. Press 'START' to start the game</p>
            <p>2. Remember the blocks that are highlighted in blue</p>
            <p>3. When the indicator says 'GO' start clicking on blocks in the same order</p>
        </div>
    );
};

export default Info;