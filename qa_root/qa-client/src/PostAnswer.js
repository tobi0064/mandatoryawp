import React, {Component} from 'react';


class PostAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit(event) {
        this.props.postAnswer(this.props.id, this.state.input);


    }

    render() {
        return (
            <>

                <input name="input" onChange={event => this.onChange(event)} type="text"/>
                <button onClick={_ => this.onSubmit()}>Post Answer</button>

            </>
        )
    }
}

export default PostAnswer;

