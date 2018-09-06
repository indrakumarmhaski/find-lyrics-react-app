import React, { Component } from 'react'
import axios from 'axios'
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

class Lyrics extends Component {

    state = {
        track: {},
        lyrics: {}
    };

    componentDidMount(){

        let track_id = this.props.match.params.id;
        // console.log(track_id);
        axios.get("https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id="+track_id+"&apikey=840acaf663949542bcc2474837f477fc") 
            .then( res =>{ 
                this.setState({lyrics: res.data.message.body.lyrics});
                
                return axios.get("https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id="+track_id+"&apikey=840acaf663949542bcc2474837f477fc")
            } )
            .then(res=>{
                this.setState({track: res.data.message.body.track});
            })
            .catch(err => console.log(err))
    }

    render() {
        const {track, lyrics} = this.state;
        // console.log(track);
        if(track===undefined||lyrics===undefined||Object.keys(lyrics).length===0||Object.keys(track).length===0){
            return <Spinner />
        } else {
            return(
                <React.Fragment>
                    <Link to="/" className=" btn btn-dark btn-sm mb-4">Go Back</Link>
                    <div className="card" >
                        <h5 className="card-header">
                            {track.track_name} by {' '}
                            <span className="text-secondary">{track.artist_name}</span>
                        </h5>
                        <div className="card-body">
                            <p className="card-text">{lyrics.lyrics_body}</p>
                        </div>
                    </div>
                    <ul className="list-group mt-3">
                        <li className="list-group-item">
                            <strong>Album Id</strong>: {track.album_id}
                        </li>
                    </ul>
                    <ul className="list-group mt-3">
                        <li className="list-group-item">
                            <strong>Song Genre:</strong>: {track.primary_genres.music_genre_list[0].music_genre.music_genre_name}
                        </li>
                        <li className="list-group-item">
                            <strong>Relese Date</strong> {track.first_release_date}
                        </li>
                    </ul>
                </React.Fragment>
            )
        }
    }
}

export default Lyrics;



