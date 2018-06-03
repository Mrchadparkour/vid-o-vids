import React from 'react'
import style from './style.css'

const Slider = ({ updateChop, chop }) => (
  <div className={style.SliderContainer}>
    <span>Less Chops</span>
    <input
      type="range"
      min="1"
      max="100"
      value={chop}
      className={style.Slider}
      onChange={(e) => updateChop(e.target.value)}
    />
    <span>More Chops</span>
  </div>
)

export default Slider
