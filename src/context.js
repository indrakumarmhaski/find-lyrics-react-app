import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
    switch(action.type){
        case 'SEARCH_TRACKS':
            return {
                ...state,
                track_list: action.payload,
                heading: 'Search Results'
            };
        default:
            return state;
    }
} 

export class Provider extends Component {

    state = {
        track_list: [],
        heading: 'Top 10 Tracks',
        dispatch: action => this.setState(state => reducer(state, action))
        // this is going to allows us to have a resucer where we can call dispatch from any consumer component to 
        // manupulate the state and do what we want in our case we want to replace the ten tracs with wahat we get
        // after the search
    }

    componentDidMount(){
        axios.get("https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=in&f_has_lyrics=1&apikey=840acaf663949542bcc2474837f477fc") 
            .then( res =>{ 
                // console.log(res.data);
                this.setState({track_list: res.data.message.body.track_list})
            } )
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Context.Provider value={this.state} >
                {this.props.children}          
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;



