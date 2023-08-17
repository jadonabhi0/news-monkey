import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country: "in",
        category: "general"
    }

    PropTypes = {
        country: PropTypes.string,
        category: PropTypes.string
    }

    constructor() {
        super()
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1dcdebfdab064feab32cf456729fb3e6&page=3&pagesize=6`;
        let data = await fetch(url);
        let parseData = await data.json()
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        })
    }


    handleNextClick = async () => {
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1dcdebfdab064feab32cf456729fb3e6&page=${this.state.page + 1}&pagesize=6`;
        let data = await fetch(url);
        let parseData = await data.json()

        this.setState({
            page: this.state.page + 1,
            articles: parseData.articles,
            loading: false
        })


    }


    handlePrevClick = async () => {
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1dcdebfdab064feab32cf456729fb3e6&page=${this.state.page - 1}&pagesize=6`;
        let data = await fetch(url);
        let parseData = await data.json()

        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false
        })
    }

    render() {
        return (
            <>
                <div className='container my-3'>
                    <h2>Top Stories</h2>
                    {this.state.loading && <Spinner />}
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className="col-md-4 my-3" key={element.url}>
                                <NewsItem title={element.title}
                                    description={element.description}
                                    imgUrl={element.urlToImage ? element.urlToImage : "https://timesofindia.indiatimes.com/photo/msid-102722498,imgsize-1283595.cms"}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date = {element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        })}
                    </div>
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} rel="noreferrer" onClick={this.handlePrevClick} type="button" className="btn btn-dark">&laquo;Prev</button>
                    <button disabled={Math.ceil(this.state.totalResults / 6) < this.state.page + 1} rel="noreferrer" onClick={this.handleNextClick} type="button" className="btn btn-dark">Next&raquo;</button>
                </div >
            </>
        )
    }
}

export default News
