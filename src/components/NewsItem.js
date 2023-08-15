import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description } = this.props
        return (
            <div>
                <div className="card" style={{ width: "18rem" }}>
                    <img src="https://variety.com/wp-content/uploads/2023/08/MCDLAVO_UV028.jpg?w=1000&h=563&crop=1" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href="/" className="btn btn-primary btn-sm">Go somewhere</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
