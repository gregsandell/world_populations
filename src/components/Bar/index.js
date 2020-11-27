import Util from '../../lib/Util'
import ReactTooltip from 'react-tooltip'
import React from 'react'

const BAR_COLORS = [{ bg: '#003f5c', fg: 'white' }, { bg: '#bc5090', fg: 'white' }, { bg: '#ffa600', fg: 'black' }]
const HORIZONTAL_CHAR_WIDTH = 8

// eslint-disable-next-line react/prop-types
const Bar = ({ population, idx, newMax, windowWidth, barHeight, skinnyBars }) => {
  const size = population.value
  const barWidth = (size / newMax) * windowWidth
  const style = {
    width: barWidth,
    height: barHeight + 'px',
    backgroundColor: BAR_COLORS[idx % 3].bg,
    color: BAR_COLORS[idx % 3].fg
  }
  const text = `${population.Country_Code} - ${population.Country} - ${Util.millionize(size)} mil`
  const textPixels = text.length * HORIZONTAL_CHAR_WIDTH
  let bar
  switch (true) {
  case skinnyBars:
    bar = (
      <div key={'c' + idx}>
        <div className='bar' style={style} alt={text} data-tip data-for={`bar${idx}`} />
        <ReactTooltip id={`bar${idx}`} place='bottom' type='dark' effect='solid'>
          <span>{text}</span>
        </ReactTooltip>
      </div>
    )
    break
  case barWidth > textPixels:
    bar = (
      <div
        className='bar' style={style} key={'c' + idx} title={text}>
        <div className='name-internal'>{text}</div>
      </div>
    )
    break
  case barWidth <= textPixels:
  default:
    bar = (
      <div key={'c' + idx}>
        <div
          className='bar shortbar' style={style} title={text} />
        <div className='name-external'>{text}</div>
      </div>
    )
  }
  return bar
}

export default Bar