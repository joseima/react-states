import React from "react";

const SECURITY_CODE = 'paradigma';


function UseReducer ({name}) {

    const [state, dispatch] = React.useReducer (reducer, initialState);



    React.useEffect(()=>{
        if(!!state.loading) {
            setTimeout(()=> {
                if(state.value === SECURITY_CODE) {
                   dispatch({type: 'CONFIRM'});
                } else {
                    dispatch({type: 'ERROR'});
                }
              }, 3000);
        }
    }, [state.loading]);



    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Delete {name} </h2>
                <p>Please write your security code</p>
                {(state.error && !state.loading) && (
                    <p>The code is incorrect. Insert new code</p> 
                )}
                {state.loading && (
                    <p>Loading...</p>
                )}
                <input 
                    placeholder="security code"
                    value={state.value}
                    onChange={(event)=> {dispatch({type: 'WRITE', payload: event.target.value}); }}
                />
                <button 
                    onClick={() => {
                        dispatch({type: 'CHECK'});
                    }}
                    >Check</button>
            </div>
        )
    } else if (state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                 <h2>Delete {name} </h2>
                <p>You confirm that you want to delete?</p>
                <button
                    onClick={()=>{
                        dispatch({type: 'DELETE'});
                    }}
                >Yes, I'm shure</button>
                <button
                    onClick={()=>{
                        dispatch({type: 'RESET'});
                }}
                >Not so shure</button>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
            <p>Succesfully deleted</p>
            <button
                    onClick={()=>{
                        dispatch({type: 'RESET'});
                }}
                >Back</button>
        </React.Fragment>
        )
    }
}

const initialState = {
    value: 'paradigma',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};

const reducerObject = (state, payload) => ({

    'ERROR': {
            ...state,
            error: true,
            loading: false,
        },
    'WRITE': {
        ...state,
        value: payload,
    },
    'CHECK': {
            ...state,
            error: false,
            loading: true,
        },
    'CONFIRM':{
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    },
    'DELETE':{
        ...state,
        deleted: true,
    },
    'RESET':{
            ...state,
            confirmed: false,
            deleted: false,
            value: '',
    },
});

const reducer = (state, action) => {
    if (reducerObject(state, action.payload)[action.type]) {
        return reducerObject(state)[action.type];
    } else {
        return state;
    }
};


export {UseReducer};