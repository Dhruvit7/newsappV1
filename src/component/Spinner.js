import React, { Component } from 'react'
import gif from './giphy.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center' >
        <img src={gif} alt='loading' style={{
        height: '100px',
        width: '100px'
      }
      }></img>
      </div>
    )
  }
}
