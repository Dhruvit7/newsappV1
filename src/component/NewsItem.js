import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title , description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
        <div className="card">
            <span className=" badge rounded-pill bg-danger" style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:0}}>
    {source}
    <span className="visually-hidden">unread messages</span>
  </span>
        <img src={imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title?title:" "}</h5>
          <p className="card-text">{description}</p>
          <p className='card-text'><small className='text-muted'>By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary" rel="noreferrer">Read More</a>
        </div>
      </div>
    )
  }
}
