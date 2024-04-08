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
    // const  [value, setValue] = React.useState('');
    // const  [error, setError] = React.useState(false);
    // const  [loading, setLoading] = React.useState(false);
    React.useEffect(()=>{
        if(!!state.loading) {
            setTimeout(()=> {
                if(state.value === SECURITY_CODE) {
                    setState({
                        ...state,
                        loading: false,
                        error: false,
                        confirmed: true,
                    });
                    //setLoading(false);
                    //setError(false);
                } else {
                    setState({
                        ...state,
                        loading: false,
                        error: true,
                    });
                    //setLoading(false);
                    //setError(true);
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
                    onChange={(event) => {
                        setState({
                            ...state,
                            value: event.target.value,
                        })
                    }}
                />
                <button 
                    onClick={() => {
                        //setLoading(true)
                        //setError(false)
                        setState({
                            ...state,
                            loading: true,
                        })
                    }}
                    >Find out</button>
            </div>
        )
    } else if (state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                 <h2>Delete {name} </h2>
                <p>You confirm that you want to delete?</p>
                <button
                    onClick={()=>{
                        setState ({
                            ...state,
                            deleted: true,
                        });
                    }}
                >Yes, I'm shure</button>
                <button
                    onClick={()=>{
                    setState ({
                        ...state,
                        confirmed: false,
                        value: '',
                    });
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
                    setState ({
                        ...state,
                        confirmed: false,
                        deleted: false,
                        value: '',
                    });
                }}
                >Back</button>
        </React.Fragment>
        )
    }
}


export {UseState};