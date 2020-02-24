import React from 'react';
import styled from 'styled-components';
import Production from './Production';
import Cast from './Cast';
class MovieDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: [],
            overview: "",
            ratings: [],
            companies: [],
            countries: [],
            keywords: [],
            genres: [],
            cast: [],
            crew: [],
            viewingCast: false,
            castID: ""
        }
    }

    async componentDidMount() {
        try {
            let url = `http://www.randyconnolly.com/funwebdev/3rd/api/movie/movies.php?id=` + this.props.id;
            const response = await fetch(url);
            const jsonData = await response.json();

            this.setState({ movie: jsonData, overview: jsonData.details.overview, ratings: jsonData.ratings, companies: jsonData.companies, countries: jsonData.countries, keywords: jsonData.keywords, genres: jsonData.genres, cast: jsonData.production.cast, crew: jsonData.production.crew });
            console.log(this.state.movie);
            // console.log(this.state.movie.details.overview);

        } catch (error) {
            console.log(error);
        }

    }
    normalView = () => {
        this.props.closeView();
    }

    setViewCast = (id) => {

        this.setState({ viewingCast: true });
        this.setState({ castID: id });
        console.log(this.state.castID);
    }

    closeView = () => {
        this.setState({ viewingCast: false, castID: null });
    }


    render() {
        return (
            <div>
                {this.state.viewingCast ? (<div>
                        {/* VIEW CAST HERE <br/>
                        {this.state.castID} */}
                        <Cast id={this.state.castID} cast={this.state.cast} crew={this.state.crew} closeView={this.closeView} setViewCast={this.setViewCast}/>
                </div>)
                    : (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr  ', gridColumn: 'span 1' }}>



                            <LeftMovieDetails> <div className="movieDetails">
                                <h2>{this.state.movie.title}</h2>
                                <img src={"https://image.tmdb.org/t/p/w342/" + this.state.movie.poster} />
                            </div>
                            </LeftMovieDetails>

                            <RightMovieDetails>
                                <button onClick={this.normalView}> CLOSE VIEW</button>

                                <div>
                                    {this.state.movie.release_date} <br />
                                    ${this.state.movie.revenue} <br />
                                    {this.state.movie.runtime}m <br />
                                    {this.state.movie.tagline} <br />
                                    <a href={"https://www.themoviedb.org/movie/" + this.state.movie.tmdb_id}> TMDB LINK</a> <br />
                                    <a href={"https://www.imdb.com/title/" + this.state.movie.imdb_id}>IMDB LINK</a> <br />
                                    {this.state.overview} <br />
                                    {this.state.ratings.popularity} <br />
                                    {this.state.ratings.average} <br />
                                    {this.state.ratings.count} <br />

                                    {/* {this.state.crew.map((m) => {
                                return  <p>{m.name}</p>
                            })} */}
                                </div>



                            </RightMovieDetails>

                            <ProductionList>
                                <div>
                                    
                                    {/* <Production cast={this.state.cast} crew={this.state.crew} setViewCast={this.setViewCast} closeView={this.closeView}></Production> */}
                                    <h2> Production</h2>
                                    <u>Cast</u> <br />
                                    {this.state.cast.map((c, index) => {
                                        return <Production key={index} setViewCast={this.setViewCast} cast={c} closeView={this.closeView} />
                                    })}
                                </div>
                            </ProductionList>
                        </div>

                    )}

            </div>




            //production here
        );
    }
}

// const Movie = styled.div`
//     background-color: green;
//     padding: 3em;,
//     grid-row: 2;
// `;
const LeftMovie = styled.div`
    padding: 3em;
    margin: 2em;
    dispay:grid;
    gridTemplateColumns: 1fr 2fr;
    gridColumn: span;
`;
const LeftMovieDetails = styled.div`
  background-color: red;

`;

const RightMovieDetails = styled.div`
   background-color: lightblue
   
`;

const ProductionList = styled.div`
    background-color: yellow;
    justify-items: stretch;
    grid-column: span 2;
`;

const Column = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    align-self: center;
    grid-column: span 1;
`

export default MovieDetails;