import React from "react";
import {Loading} from "./Loading";
const SECURITY_CODE = 'paradigma';


class ClassState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            error: false,
            loading: false,
        }
    }

    // UNSAFE_componentWillMount() {
    // }
    // componentDidMount() {
    // }

    componentDidUpdate() {
        console.log('actualizado');
        if(!!this.state.loading) {
            setTimeout(()=> {
                if(SECURITY_CODE === this.state.value) {
                    this.setState({error: false, loading: false});  
                } else {
                    this.setState({error: true, loading: false});  
                }
              }, 3000);
        }
    }
    render  () {

       // const {error, loading, value } = this.state; si queremos ahorrra this.state podemso destructurar
        return (
            <div>
                <h2>Delete {this.props.name} </h2>
                <p>Please write your security code</p>
                {(this.state.error && !this.state.loading) && (
                    <p>The code is incorrect. Insert new code</p>
                )}
                {this.state.loading && (
                    <Loading />
                )}
                <input 
                    placeholder="security code"
                    value={this.state.value}
                    onChange={(event)=> {
                        this.setState({value:event.target.value});
                    }}
                />
                <button
                    onClick={() => 
                        this.setState({loading: true})}
                >Comporbar</button>
            </div>
        )
    };
}

export {ClassState};