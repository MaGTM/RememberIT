import React, {Reducer} from "react";



interface initialStateInterface {
    app: {
        theme?: string,
        settings?: {
            startingPoint?: number
        }
    }
}

interface actionInterface {
    type: string,
    payload: string | number
}

export const initialState: initialStateInterface = {
    app: {
        theme: 'light',
        settings: {
            startingPoint: 1
        }
    }
};

export const ContextApp = React.createContext<{state: initialStateInterface, dispatch: React.Dispatch<any>}>({
    state: initialState,
    dispatch: () => undefined
});

export const appReducer: Reducer<initialStateInterface, actionInterface> = (state, action): initialStateInterface => {
    switch(action.type) {
        case CHANGE_THEME:
            return {
                app: {
                    theme: String(action.payload),
                    settings: {
                        ...state.app.settings,
                    }
                }

            };
        case CHANGE_STARTING_POINT:
            return {
                app: {
                    ...state.app,
                    settings: {
                        startingPoint: Number(action.payload)
                    }
                }

            };
        default:
            return state
    }
};

export const CHANGE_THEME = 'change_theme'
export const CHANGE_STARTING_POINT = 'change_starting_point'