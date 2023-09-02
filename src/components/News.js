import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

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
            loading: true,
            page: 1,
            totalResults: 0
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
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1dcdebfdab064feab32cf456729fb3e6&page=${this.state.page}&pagesize=6`;
        let data = await fetch(url);
        let parseData = await data.json()

        this.setState({
            totalResults: parseData.totalResults,
            articles: parseData.articles,
            loading: false
        })


    }




    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1dcdebfdab064feab32cf456729fb3e6&page=${this.state.page}&pagesize=6`;
        let data = await fetch(url);
        let parseData = await data.json()

        this.setState({
            totalResults: parseData.totalResults,
            articles: this.state.articles.concat(parseData.articles)
        })
    };

    render() {
        return (
            <>
                <div className='container my-3'>
                    <h2>Top Stories</h2>
                    {this.state.loading && <Spinner />}

                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner />}
                    >
                        <div className="container">
                            <div className="row">


                                {this.state.articles.map((element) => {
                                    return <div className="col-md-4 my-3" key={element.url}>
                                        <NewsItem title={element.title}
                                            description={element.description}
                                            imgUrl={element.urlToImage ? element.urlToImage : "https://timesofindia.indiatimes.com/photo/msid-102722498,imgsize-1283595.cms"}
                                            newsUrl={element.url}
                                            author={element.author}
                                            date={element.publishedAt}
                                            source={element.source.name}
                                        />
                                    </div>
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>

            </>
        )
    }
}

export default News
