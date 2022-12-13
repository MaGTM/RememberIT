import React, {useContext, useState} from 'react';
import s from './Settings.module.css'
import {CHANGE_STARTING_POINT, CHANGE_THEME, ContextApp} from "../../store/reducers";

interface settingsInterface {
    theme?: string,
    startingPoint: number | string
}

const Settings = () => {
    let {state, dispatch} = useContext(ContextApp)
    let [settings, setSettings] = useState<settingsInterface>({
        theme: state.app.theme,
        startingPoint: state.app.settings?.startingPoint!
    })

    let checkBoxHandler = () => {
        switch (settings.theme) {
            case 'light':
                setSettings({...settings, theme: 'dark'})
                localStorage.setItem('theme', 'dark')
                dispatch({
                    type: CHANGE_THEME,
                    payload: 'dark'
                })
                break
            case 'dark':
                setSettings({...settings, theme: 'light'})
                localStorage.setItem('theme', 'light')
                dispatch({
                    type: CHANGE_THEME,
                    payload: 'light'
                })
                break
        }
    }

    let startingPointHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number(e.target.value)
        if(value === 0) {
            dispatch({
                type: CHANGE_STARTING_POINT,
                payload: 1
            })
            setSettings({...settings, startingPoint: ''})
            return
        }
        dispatch({
            type: CHANGE_STARTING_POINT,
            payload: value
        })
        setSettings({...settings, startingPoint: value})
    }

    return (
        <div className={s.content}>
            <label id={s.themeSwitcher}>
                <input type="checkbox" value={settings.theme} onChange={checkBoxHandler}/>
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.998 511.998">
                    <g>
                        <g>
                            <path d="M375.509,49.952c-31.2-31.601-72.82-49.336-117.192-49.937c-22.362-0.301-44.251,3.867-65.032,12.393
			c-4.455,1.828-6.585,6.921-4.756,11.377c1.828,4.455,6.921,6.586,11.377,4.756c18.594-7.629,38.177-11.375,58.175-11.089
			c39.762,0.538,77.057,16.431,105.019,44.751c27.986,28.346,43.4,65.897,43.4,105.735c0,32.078-9.961,62.698-28.807,88.551
			c-0.155,0.207-0.298,0.423-0.43,0.645l-1.679,2.796c-7.916,13.178-14.754,24.56-20.606,34.752
			c-2.398,4.176-0.957,9.506,3.219,11.904c1.368,0.786,2.861,1.16,4.334,1.16c3.02,0,5.957-1.572,7.57-4.38
			c5.767-10.043,12.563-21.356,20.432-34.455l1.482-2.468c20.886-28.79,31.923-62.842,31.923-98.506
			C423.939,123.484,406.74,81.582,375.509,49.952z"/>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M359.169,391.326c0-11.226-5.95-21.085-14.861-26.599c1.76-9.854,4.705-19.208,9.336-29.743
			c1.938-4.409-0.065-9.553-4.474-11.491c-4.407-1.937-9.553,0.065-11.491,4.474c-4.892,11.129-8.206,21.484-10.243,32.098h-79.01
			c-4.816,0-8.72,3.904-8.72,8.72s3.904,8.72,8.72,8.72h79.481c0.432,0,0.858,0.026,1.281,0.065c0.11,0.01,0.22,0.024,0.33,0.037
			c0.339,0.039,0.674,0.089,1.006,0.153c0.085,0.016,0.171,0.03,0.256,0.049c6.248,1.327,10.952,6.882,10.952,13.519
			c0,7.622-6.201,13.824-13.824,13.824H184.09c-7.622,0-13.823-6.201-13.823-13.824c0-6.637,4.704-12.193,10.953-13.519
			c0.084-0.017,0.169-0.031,0.252-0.048c0.333-0.064,0.669-0.115,1.008-0.155c0.109-0.013,0.22-0.027,0.329-0.037
			c0.422-0.04,0.849-0.065,1.281-0.065h29.914c4.816,0,8.72-3.904,8.72-8.72s-3.904-8.72-8.72-8.72H184.56
			c-5.615-29.327-20.45-54.026-48.099-100.051l-1.728-2.876c-0.134-0.222-0.277-0.437-0.429-0.648
			c-18.846-25.853-28.807-56.474-28.807-88.551c0-48.394,24.046-94.315,64.324-122.836c3.93-2.783,4.86-8.226,2.076-12.155
			c-2.784-3.93-8.227-4.861-12.155-2.076c-44.886,31.786-71.683,83.027-71.683,137.069c0,35.662,11.037,69.715,31.923,98.506
			l1.531,2.548c27.87,46.397,41.368,68.88,46.17,95.737c-8.907,5.515-14.856,15.372-14.856,26.596c0,8.852,3.704,16.85,9.637,22.543
			c-5.933,5.693-9.637,13.691-9.637,22.543c0,17.238,14.025,31.263,31.263,31.263h14.221c6.861,25.737,30.427,44.322,57.687,44.322
			c27.26,0,50.826-18.586,57.687-44.322h14.222c17.238,0,31.263-14.025,31.263-31.263c0-8.852-3.704-16.85-9.637-22.543
			C355.465,408.176,359.169,400.178,359.169,391.326z M255.999,494.56c-17.678,0-33.165-11.033-39.374-26.883h78.749
			C289.164,483.526,273.675,494.56,255.999,494.56z M327.908,450.236H184.09c-7.622,0-13.823-6.201-13.823-13.824
			s6.201-13.824,13.823-13.824h143.818c7.622,0,13.824,6.201,13.824,13.824S335.53,450.236,327.908,450.236z"/>
                        </g>
                    </g>
                </svg>
                <span/>
                <svg viewBox="0 0 510.96 512">
                    <g>
                        <g>
                            <path d="M374.6,50A166.9,166.9,0,0,0,257.41,0a164.37,164.37,0,0,0-65,12.39A8.72,8.72,0,1,0,199,28.54a147,147,0,0,1,58.18-11.09,150.51,150.51,0,0,1,119.61,239,6.51,6.51,0,0,0-.43.64l-1.68,2.8c-7.92,13.18-14.76,24.56-20.61,34.75a8.72,8.72,0,1,0,15.13,8.69c5.76-10.05,12.56-21.36,20.43-34.46l1.48-2.47A167.94,167.94,0,0,0,374.6,50Z"/>
                            <path d="M358.26,391.33a31.26,31.26,0,0,0-14.86-26.6A128.18,128.18,0,0,1,352.74,335a8.72,8.72,0,1,0-16-7,148.16,148.16,0,0,0-10.24,32.1h-79a8.72,8.72,0,0,0,0,17.44H327c.43,0,.86,0,1.28.06l.33,0c.34,0,.68.09,1,.15l.25.05A13.82,13.82,0,0,1,327,405.15H183.18a13.82,13.82,0,0,1-2.87-27.34l.26-.05c.33-.06.66-.11,1-.15l.33,0c.42,0,.85-.07,1.28-.07H213.1a8.72,8.72,0,0,0,0-17.44H183.65C178,330.74,163.2,306,135.55,260l-1.72-2.87c-.14-.22-.28-.44-.43-.65a149.31,149.31,0,0,1-28.81-88.55c0-48.4,24-94.32,64.32-122.84a8.72,8.72,0,0,0-10.07-14.23C114,62.66,87.15,113.9,87.15,167.94a166.67,166.67,0,0,0,31.93,98.51l1.53,2.54c27.87,46.4,41.37,68.88,46.17,95.74a31.21,31.21,0,0,0-5.22,49.14,31.24,31.24,0,0,0,21.62,53.81H197.4a59.71,59.71,0,0,0,115.38,0H327a31.25,31.25,0,0,0,21.63-53.81A31.16,31.16,0,0,0,358.26,391.33ZM255.09,494.56a42.4,42.4,0,0,1-39.37-26.88h78.75A42.41,42.41,0,0,1,255.09,494.56ZM327,450.24H183.18a13.83,13.83,0,0,1,0-27.65H327a13.83,13.83,0,1,1,0,27.65Z"/>
                            <rect x="246.98" y="-101.4" width="17" height="715.56" rx="8.5"
                                  transform="translate(-106.46 255.74) rotate(-45)"/>
                        </g>
                    </g>
                </svg>
            </label>
            <div id={s.startingPointSetter}>
                <p>Starting Point</p>
                <input type="number" value={settings.startingPoint} onChange={startingPointHandler}/>
            </div>
        </div>
    );
};

export default Settings;