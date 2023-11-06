//6488120 Suphavadee Cheng
//API: https://www.themoviedb.org/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

let n = 0;

// This function uses to change the search page,
// we have normal search page and advanced search page.
// By doing this, we will increase one when user click
// button and it will change.
function change() {
  n++;
  if (n % 2 === 0) {
    root.render(<Movie type="normal" />);
  } else {
    root.render(<Movie type="special" />);
  }
}


class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({     // what it's keep ?             | where it gets from
      movieName: "",    // movie name                   |   (user's input)
      year: "",         // year                         |   (user's input)
      page: "",         // page                         |   (user's input)
      url: "",          // url                          | generated at handleSubmit(e)
      data: [],         // data(results) from url       | fetch at handleValueReceived
      submit: false,    // clicked submit or not        | generated at handleSubmit(e) 
      press: 0,         // no of time that press button | increase at handleSubmit(e) => use to indicate that it press again
    });
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const elementname = target.name;
    console.log(target);
    this.setState({
      [elementname]: value,
    });
  }

  // when the form is submitted
  handleSubmit(e) {
    e.preventDefault();

    // 2 types of type: normal and special
    let rooturl = null;
    const API = "7310858bfff2d8e354ef84d4ce5d24e9";
    if (this.props.type === 'normal') {
      // 1. type of normal
      //    input: movie name
      //    use: /search/movie + &query
      rooturl = "https://api.themoviedb.org/3/search/movie?api_key="+API+"&query=" + this.state.movieName;
    } else {
      // 1. type of special
      if (this.state.movieName === "" && this.state.year === "" && this.state.page === "") {
        // input: nothing fill in
        // use: /search/movie + &query + the unknown query
        rooturl = "https://api.themoviedb.org/3/search/movie?api_key="+API+"&query=hahahaCannotOpenjaMaimeethisNameeiei12312121";
      }
      else if (this.state.movieName === "" && this.state.year === "") {
        // input: page
        // use: /discover/movie + &page
        rooturl = "https://api.themoviedb.org/3/discover/movie?api_key="+API;
        rooturl += "&page=" + this.state.page;
      }
      else if (this.state.year === "" && this.state.page === "") {
        // input: movie name
        // use: /search/movie + &query
        rooturl = "https://api.themoviedb.org/3/search/movie?api_key="+API+"&query=" + this.state.movieName;
      }
      else if (this.state.movieName === "" && this.state.page === "") {
        // input: year
        // use: /discover/movie + &primary_release_year
        rooturl = "https://api.themoviedb.org/3/discover/movie?api_key="+API;
        rooturl += "&primary_release_year=" + this.state.year;
      }
      else if (this.state.movieName === "") {
        // input: page and year
        // use: /discover/movie + &page + &primary_release_year
        rooturl = "https://api.themoviedb.org/3/discover/movie?api_key="+API;
        rooturl += "&page=" + this.state.page;
        rooturl += "&primary_release_year=" + this.state.year;
      }
      else if (this.state.page === "") {
        // input: movie name and year
        // use: /search/movie + &query + &primary_release_year
        rooturl = "https://api.themoviedb.org/3/search/movie?api_key="+API;
        rooturl += "&primary_release_year=" + this.state.year;
        rooturl += "&query=" + this.state.movieName;
      }
      else if (this.state.year === "") {
        // input: movie name and page
        // use: /search/multi + &query + &page
        rooturl = "https://api.themoviedb.org/3/search/multi?api_key="+API;
        rooturl += "&query=" + this.state.movieName;
        rooturl += "&page=" + this.state.page;
      } else {
        // input: movie name, page, and year
        // use: /search/movie + &page + &primary_release_year + &page
        rooturl = "https://api.themoviedb.org/3/search/movie?api_key="+API;
        rooturl += "&page=" + this.state.page;
        rooturl += "&primary_release_year=" + this.state.year;
        rooturl += "&query=" + this.state.movieName;
      }
    }


    // updated value, so the other class will get it
    // set the state of url to updated one 
    this.setState({ url: rooturl }, () => {
      this.handleValueReceived(this.state.url);
    });

    // change the state of sumbit to true
    this.setState({ submit: true }, () => {
      this.handleValueReceived(this.state.submit);
    });

    // increase one to the value of press 
    this.setState({ press: this.state.press + 1 }, () => {
      this.handleValueReceived(this.state.press);
    });
  }


  // use to fetch API from url that we generated
  handleValueReceived = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data: data.results }); // set the data result that we received after fetching
      })
      .catch((err) => console.log(err));
  }

  render() {
    //  when user type and change the text it will updated ::: onChange={(e) => this.handleChange(e)
    // ------------  Lists class  ----------- (other class)
    //  data={this.state.data}       => send the result that we get when we fetch the url
    //  submit={this.state.submit}   => indicate that we click submit already
    //  press={this.state.press}     => when user click it will update the value to other class that user already click submit
    //  onValueReceived={this.handleValueReceived}  => send the value of the onValueReceived to Lists class
    if (this.props.type === 'normal') {
      // normal search
      // -----------  #searchName  -----------
      //  passing the user's input from this value ::: value={this.state.movieName}
      return (
        <p>
          <h1>M O V I E</h1>
          <h3 class='searchtext'>Normal Search</h3>
          <form onSubmit={this.handleSubmit} class="fillform">
            <input name="movieName" type="text" placeholder="Search..." class="nameN" id="searchName" value={this.state.movieName} onChange={(e) => this.handleChange(e)} />
            <input type="submit" value="Search" class="button" id="A" />
          </form >
          <button onClick={change}>Advance Search</button>
          <br></br>
          <br></br>
          <Lists data={this.state.data} submit={this.state.submit} press={this.state.press} onValueReceived={this.handleValueReceived} />
        </p>
      );
    } else {
      //advanced search
      // -----------  #searchName  -----------
      //  passing the user's input from this value ::: value={this.state.movieName}
      // --------------  #year  --------------
      //  passing the user's input from this value ::: value={this.state.year}
      // --------------  #page  --------------
      //  passing the user's input from this value ::: value={this.state.page}
      return (
        <p>
          <h1>M O V I E</h1>
          <h3 class='searchtext'>Criteria Search</h3>
          <form onSubmit={this.handleSubmit} class="fillform">
            <input name="movieName" type="text" placeholder="Search..." class="name" id="searchName" value={this.state.movieName} onChange={(e) => this.handleChange(e)} />
            <br></br>
            <label class="box">Year (1887-now)</label>
            <input name="year" type="text" placeholder="Year..." id="year" class="criteria" value={this.state.year} onChange={(e) => this.handleChange(e)} />
            <label class="box">Page (1-500):</label>
            <input name="page" type="text" placeholder="Page..." id="page" class="criteria" value={this.state.page} onChange={(e) => this.handleChange(e)} />
            <input type="submit" value="Advance Search" class="button" id="S" />
          </form >
          <button onClick={change}>Normal Search</button>
          <br></br>
          <br></br>
          <Lists data={this.state.data} submit={this.state.submit} press={this.state.press} onValueReceived={this.handleValueReceived} />

        </p>
      );
    }
  }
}

class Lists extends React.Component {

  constructor(props) {
    super(props);
    this.state = {    // what it's keep ?                  | where it gets from
      data: [],       // data that has movie's detail      | (Movie's class) - send it as a prop
      item: null,     // movie that is selected            | get when user click the card
      click: false,   // is it click or not                | it will set when => handleCardClick(selectedMovie)
      prevPress: 0,   // keep the previous value of press  | it will set when the value of press (from Movie's class) is changed
    };
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  // when user click the card
  handleCardClick(selectedMovie) {
    this.setState({ item: selectedMovie }); // take the item that user click
    this.setState({ click: true }); // click => true ::: the card is clicked now
  }

  // when user click go back to search page
  handleBackClick() {
    this.setState({ click: false });
  }

  // set this genre id to text
  // from this website: https://www.themoviedb.org/talk/5daf6eb0ae36680011d7e6ee
  // take only movie part
  static genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };


  render() {

    // if the [press] value is changed
    // it will set the [prevPress] to be current value
    // then change the state of [click] to false
    // (this condition will happen after user is in the one movie showing page and
    //  at that page ... the state of [click] is true because the movie is clicked
    //  so we need to set the false again to change the page to list page)
    if (this.state.prevPress !== this.props.press) {
      this.setState({ prevPress: this.props.press });
      this.setState({ click: false });
    }

    // if there is noting in data, it will send NOT FOUND
    if (this.props.data === undefined && this.props.submit === true) {
      return (
        <p id="output">
          <h3 class='not'>NOT FOUND</h3>
        </p>
      );
    }
    // this will show the output from search
    if (this.props.data.length > 0 && this.props.submit === true && this.state.prevPress === this.props.press && this.state.click === false) {
      // this.props.data.length > 0  :::  the data should have the movies
      // this.props.submit === true  :::  user need to click submit first
      // this.state.prevPress === this.props.press  :::  the prevpress and press has to have same value 
      //                                                 because it mean that user want to searh new value so it
      //                                                 need to change to search page
      // this.state.click === false)  :::  if user didn't click card

      // onClick={() => this.handleCardClick(mv)} use when that card is clicked, it will call the function
      return (
        <div class="container">
          <h3 id="topic">Result</h3>
          <p id="output">
            {this.props.data.map((mv) => (
              <div onClick={() => this.handleCardClick(mv)}>
                <div className="card">
                  <img alt="" src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${mv.poster_path}`} />
                  <div class="info">
                    <span class='dot'>{mv.original_language}</span>
                    <h2>{mv.title}</h2>
                    <h1 class='detail'> Release Date: {mv.release_date}</h1>
                    <h1 class='detail'> Popularity: {mv.popularity}</h1>
                    <p className="ov">{mv.overview}</p>
                  </div>
                </div>
              </div>
            ))}
          </p>
        </div>
      );
    }
    else if (this.props.submit === true && this.state.click === false) {
      // in case there is no data (no any movie is matched) after user click for search
      return (
        <p id="output">
          <h3 class='not'>NOT FOUND</h3>
        </p>
      );
    }

    // if user click the card it will show this condition
    // ---------------  .back  -----------------
    //  onClick={() => this.handleBackClick()} if this [back] is clicked, it will call function of handleBackClick() 
    //  to get back to normal/special search page
    // ----------  genre_ids.map(gen) ----------
    // use the gen as a index and we use the genres that we set above to show up the text instead of id 

    // *** we use value from the [this.state.item] that I set in the this.handleCardClick function ***
    if (this.state.click === true) {
      return (
        <p id="outputSelected">
          <span class='back' onClick={() => this.handleBackClick()}> back</span>
          <img id="pic" alt="" src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${this.state.item.poster_path}`} />
          <div class="infoSelected">
            <h1 class="topicSelected">{this.state.item.title}</h1>
            <h1 class='detailgenSelected'>
              {this.state.item.genre_ids.map((gen) => (
                <p class='gen'>{this.constructor.genres[gen]}</p>
              ))}
            </h1>
            <h1 class='detailSelected'> Original Language: {this.state.item.original_language}</h1>
            <h1 class='detailSelected'> Release Date: {this.state.item.release_date}</h1>
            <h1 class='detailSelected'> ID: {this.state.item.id}</h1>
            <h1 class='detailSelected'> Popularity: {this.state.item.popularity}</h1>
            <h1 class='detailSelected'> Vote: {this.state.item.vote_count}</h1>
            <h1 class='detailSelected'> Vote Average: {this.state.item.vote_average}</h1>
            <br></br><br></br>
            <div class='ovS'>
              <h3 class='topicOV'>Overview</h3>
              <p className="ovSelected">{this.state.item.overview}</p>
            </div>
          </div>
          <img id="picBD" alt="" src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${this.state.item.backdrop_path}`} />
        </p>
      );
    }
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Movie type="normal" />); // first it show the normal search page

reportWebVitals();

