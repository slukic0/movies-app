import { Component } from "react";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import noPoster from '../../images/noPoster.png'
import clock from '../../images/clock.png'
import star from '../../images/star.png'
import FavButton from "../FavButton/FavButton";
import { Row, Col, Image, Container } from 'react-bootstrap';
import './MoviePage.css'

const POSTER_SIZE = 'w500/'

class MoviePage extends Component{
    constructor(props) {
        super(props)
        this.state = {
            ID: -1,
            data: null,
            isFav: false,
            imgLoaded: false,
            server: process.env.REACT_APP_SERVER_URL || ''
        }
    }

    getData = () =>{
        const URL = this.state.server+`/movies/getmovie/${this.state.ID}`

        axios.get(URL)
        .then((response) => {
            let myGenres = ''
            for (let i = 0; i < response.data.genres.length-1; i++) {
                myGenres += response.data.genres[i].name + ', '
            }
            myGenres += response.data.genres[response.data.genres.length-1].name
            
            this.setState({
                data: response.data,
                genres: myGenres
            })
        })
        .catch(err =>{
            console.log(err)
        });
    }

    componentDidMount = () =>{
        this.setState({
            ID: this.props.match.params.id,
            isFav: this.props.location.state.isFav
        }, () => {
            this.getData()
        })
    }

    render(){
        if (this.state.data){

            let poster_url
            (this.state.data.poster_path == null) ? poster_url= noPoster : poster_url = 'https://image.tmdb.org/t/p/'+POSTER_SIZE + this.state.data.poster_path

            return(
                <Container fluid='lg' className='text-center movie'>
                    <Row xl={2} lg={1}>
                            <Col id='img'>
                                <Image 
                                    thumbnail
                                    src={poster_url} 
                                    fluid className='tile-img' 
                                    onLoad={() => this.setState({imgLoaded: true})}
                                    style={this.state.imgLoaded ? {} : {display: 'none'}}
                                />
                            </Col>
                            <Col id='info'>
                                <h1 className="title">{this.state.data.title}</h1>
                                <br/>
                                <h4 className="title">{this.state.data.overview}</h4>
                                <br/>
                                <h4 className="title">{this.state.genres}</h4>
                                <br/>
                                <Row>
                                    <Col sm={3} className='inline-pic'>
                                        <h5> <img src={clock} alt='clock' style={{height: '2.0em'}}/> {parseInt(this.state.data.runtime/60)}:{this.state.data.runtime%60}</h5>
                                    </Col>
                                    <Col sm={3} className='inline-pic'>
                                        <h5> <img src={star} alt='star' style={{height: '2.0em'}}/> {this.state.data.vote_average}</h5>
                                    </Col>
                                    <Col sm={6}>
                                        <div className="d-grid gap-2">
                                            {<FavButton isFav={this.state.isFav} id={this.state.ID}/>}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                     </Row>
                </Container>
            )
        }
        else{
            return(<Spinner/>)
        }
        
    }
}

export default MoviePage