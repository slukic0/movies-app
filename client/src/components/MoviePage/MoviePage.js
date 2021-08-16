import { Component } from "react";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import Spinner from "../Spinner/Spinner";
import noPoster from '../../images/noPoster.png'
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
            imgLoaded: false,
            server: process.env.REACT_APP_SERVER_URL || ''
        }
    }

    getData = () =>{
        const URL = this.state.server+`/movies/getmovie/${this.state.ID}`

        axios.get(URL)
        .then((response) => {
            this.setState({
                data: response.data
            })
        })
        .catch(err =>{
            console.log(err)
        });
    }

    componentDidMount = () =>{
        this.setState({ID: this.props.match.params.id}, () => {
            this.getData()
        })
    }

    //TODO: How do we get isFav if the page is dynamically routed
    render(){
        console.log(this.state.data);
        if (this.state.data){
            const { isAuthenticated } = this.props.auth0

            let poster_url
            (this.state.data.poster_path == null) ? poster_url= noPoster : poster_url = 'https://image.tmdb.org/t/p/'+POSTER_SIZE + this.state.data.poster_path

            return(
                <Container fluid='lg' className='movie' className='text-center'>
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
                                <h4 className="title">{this.state.data.overview}</h4>
                                <Row>
                                    <Col sm={3}>
                                        <h5>{parseInt(this.state.data.runtime/60)}:{this.state.data.runtime%60}</h5>
                                    </Col>
                                    <Col sm={3}>
                                        <h5>{this.state.data.vote_average}</h5>
                                    </Col>
                                    <Col sm={6}>
                                        <div className="d-grid gap-2">
                                            {<FavButton isFav={this.props.isFav} id={this.state.ID}/>}
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

export default withAuth0(MoviePage)