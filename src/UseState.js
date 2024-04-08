import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState ({name}) {

    const [state, setState] = React.useState ({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    });



    const onConfirm = () => {
        setState({
            ...state,
            loading: false,
            error: false,
            confirmed: true,
        });
    }
    const onError = () => {
        setState({
            ...state,
            loading: false,
            error: true,
        });
    }

    const onWrite = (newValue) => {
        setState({
            ...state,
            value: newValue,
        });
    }

    const onCheck = () => {
        setState({
            ...state,
            loading: true,
        });
    }

    const onDelete = () => {
        setState ({
            ...state,
            deleted: true,
        });
    }
    const onReset = () => {
        setState ({
            ...state,
            confirmed: false,
            deleted: false,
            value: '',
        });
    } 

    React.useEffect(()=>{
        if(!!state.loading) {
            setTimeout(()=> {
                if(state.value === SECURITY_CODE) {
                   onConfirm();
                } else {
                    onError();
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
                    onChange={(event)=> {onWrite(event.target.value)} }
                />
                <button 
                    onClick={() => {
                        onCheck();
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
                        onDelete();
                    }}
                >Yes, I'm shure</button>
                <button
                    onClick={()=>{
                    onReset();
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
                    onReset();
                }}
                >Back</button>
        </React.Fragment>
        )
    }
}


export {UseState};