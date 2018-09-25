
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);


    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);




    this.state = {
          searchResults: [],

playlistName:'New Playlist',

playlistTracks: []
}
};

  addTrack(track) {
     if (this.state.playlistTracks.find(trackSave =>
     trackSave.id === track.id)) {
       return;
     }
     else{
     let newList = this.state.playlistTracks.slice();
      newList.push(track);
      this.setState({playlistTracks : newList});
  }
}

removeTrack(track) {
  if (!this.state.playlistTracks.find(trackRemove =>
  trackRemove.id === track.id)) {
    return;
  } else {
    let newList = this.state.playlistTracks.filter(trackRemove =>
    trackRemove.id !== track.id);
    this.setState({playlistTracks : newList});
}
}

updatePlaylistName(name) {
  this.setState({playlistName: name});
}

savePlaylist() {
  let playlistName = this.state.playlistName;
  let trackURIs = [];
  this.state.playlistTracks.forEach(track => trackURIs.push(track.uri));
  Spotify.savePlaylist(playlistName, trackURIs);
}

search (term) {
Spotify.search(term).then(searchResults => {
this.setState({searchResults: searchResults});
});
}
  render() {
    return (
      <div>
    <h1>Ja<span class="highlight">mmm</span>ing</h1>
    <div className="App">
     <SearchBar onSearch={this.search}/>
      <div className="App-playlist">
      <SearchResults
      searchResults={this.state.searchResults}
      onAdd={this.addTrack}
          />
        <Playlist
        playlistName={this.state.playlistName}
        playlistTracks={this.state.playlistTracks}
        onRemove={this.removeTrack}
        onNameChange={this.updatePlaylistName}
        onSave={this.savePlaylist} />
        />
      </div>
    </div>
  </div>
    );
  }
}

export default App;
