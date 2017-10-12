import React from 'react';
import ReactDOM from 'react-dom';
var axios = require('axios');

const Card = (props) => {
    return (
        <div style={{margin: '1em'}}>
            <img style={{ width: '75px'}} src={props.avatar_url} alt="Github Avatar"/>

            <div style={{ display: 'inline-block', marginLeft: '10' }}>
                <div>
                    {props.name}
                </div>
                <div>{props.company}</div>
            </div>
            
        </div>
    );
};

const CardList = (props) => {
    return (
        <div>
            {props.cards.map(card => <Card key={card.id} {...card}/>)}
        </div>
    );
}

class Form extends React.Component {
    state = { userName: ''}

    hadleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.userName);
        axios.get(`https://api.github.com/users/${this.state.userName}`)
            .then(resp => {
                console.log(resp);
                this.props.onSubmit(resp.data)
            })
    }

    render() {
        return (
            <form onSubmit={this.hadleSubmit}>
                <input
                    value={this.state.userName}
                    onChange={(event) => this.setState({
                        userName : event.target.value
                    })}
                    type="text" placeholder="Github Username" />
                <button type="submit">Add Card</button>
            </form>
        )
    }
}

class App extends React.Component {

    state = {
        cards : []
    }

    addNewCard = (cardInfo) => {
        this.setState(prevState => ({
            cards: prevState.cards.concat(cardInfo)
        }))
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.addNewCard}/>
                <CardList cards={this.state.cards}/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))