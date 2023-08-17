import React, { Component } from 'react'

export class NewsItem extends Component {



    render() {
        let { title, description, imgUrl, newsUrl, author, date, source } = this.props;
        return (
            <div>
                <div className="card">
                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <span className='position-absolute top-0 translate-middle badge rounded-pill bg-danger' style={{ left: "50%", zIndex: 1 }}>{source}</span>
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p class="card-text"><small class="text-muted"><b>Author :</b> {author ? author : "Unknown"}</small></p>
                        <p class="card-text"><small class="text-muted">{new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target='_blank' className="btn btn-dark btn-sm">Read</a>

                    </div>
                </div>
            </div>
        )
    }
};

export default NewsItem
