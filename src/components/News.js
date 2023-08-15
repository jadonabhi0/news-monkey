import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'

export class News extends Component {

    render() {
        return (
            <div className='container my-3'>
                <h2>Top Stories</h2>
                <div className="row my-3">
                    <div className="col-md-3"><NewsItem title="title" description="description" /></div>
                    <div className="col-md-3"><NewsItem title="title" description="description" /></div>
                    <div className="col-md-3"><NewsItem title="title" description="description" /></div>
                    <div className="col-md-3"><NewsItem title="title" description="description" /></div>
                </div>


            </div>
        )
    }
}

export default News
