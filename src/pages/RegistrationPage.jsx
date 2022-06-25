import React from 'react';

class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        JSON.stringify(this.state);
        event.preventDefault();
    }

    render() {
        return (
        <form>
            <label>
                User Name:
                <input
                    name="userName"
                    type="text"
                    value={this.state.userName}
                    onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
                Password:
                <input
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleInputChange} />
            </label>
            <br />
        </form>);
    }
}

export default RegistrationPage;