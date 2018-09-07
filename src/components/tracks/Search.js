import React, { Component } from 'react';
import axios from 'axios'
import { Consumer } from '../../context'


class Search extends Component {

    state = {
        trackTitle: ''
    }

    onChange = e=> {
        this.setState({ trackTitle: e.target.value });
    }

    findTrack = (e) => {
        e.preventDefault();
        let trackTitle = this.state.trackTitle;
        axios.get("https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track="+trackTitle+"&page_size=10&page=1&s_track_rating=desc&apikey=840acaf663949542bcc2474837f477fc") 
        .then( res =>{ 
            console.log(res.data);
            // this.setState({track_list: res.data.message.body.track_list})
        } )
        .catch(err => console.log(err))
    }

    render() {
        return (
            <Consumer>
                { value =>{
                    return(
                        <div className="card card-body mb-4 mb-4">
                            <h1 className="display-4 text-center">
                                <i className="fas fa-music"></i> Search For A Song
                            </h1>
                            <p className="lead text-center">Get the lyrics for any song</p>
                            <form onSubmit={this.findTrack}>
                                <div className="form-group">
                                    <input className="form-control-lg form-control"
                                     type="text"
                                     placeholder="Song title.."
                                     name="trackTitle"
                                     value={ this.state.trackTitle }
                                    //  onChange={this.onChange.bind(this)}></input> insted of binding u can use aro func
                                     onChange={this.onChange}></input>
                                </div>
                                <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">
                                    Get Track Lyrics
                                </button>
                            </form>
                        </div>
                    )
                } }
            </Consumer>
        );
    }
}

export default Search;
 