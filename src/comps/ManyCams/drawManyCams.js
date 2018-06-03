const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame

export default function(canvas, chop) {
  const ctx = canvas.getContext('2d')
  let video
  let reload = false
  //if this function hasn't been called yet there wont be a vid element attached to window.vid
  if (!window.vid) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia || navigator.msGetUserMedia
    if (!navigator.getUserMedia) return false

    video = document.createElement('video')

    //Doesn't show video without these two lines
    video.setAttribute('autoplay',true);
    window.vid = video
    //Get Webcam Data
    navigator.getUserMedia({ video: true, audio: false }, (stream) => {
      video.srcObject = stream
    }, (e) => console.error('Rejected', e))
  } else {
    //If it has been called already we can copy previous video element from
    //window.vid
    video = window.vid
    reload = true
    cancelAnimationFrame(window.myReq)
  }

  let height
  let width
  let cellW
  let cellH

  function mainVideoLoop(){
    ctx.clearRect(0,0, width, height)
    ctx.drawImage(video, 0, 0, width, height)
    for (let x=0; x<width;x+=cellW) {
      for (let y=0; y<height;y+=cellH) {
        let c = getAverageRGB(x, y)
        ctx.fillStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, .8)`
        ctx.drawImage(video, x, y, cellW, cellH)
        ctx.fillRect(x, y, cellW, cellH)
      }
    }
      window.myReq = requestAnimationFrame(mainVideoLoop)
  }

  // Gets average RGB of a box sized cellH X cellW starting at startX, startY
  function getAverageRGB(xStart, yStart) {
    const chunk = ctx.getImageData(xStart, yStart, cellW, cellH).data
    const d = cellW * cellH
    let rgb = [0,0,0]

    for(let i=0; i<chunk.length; i++) {
      if (i % 4 < 3) rgb[i % 4] += chunk[i]
    }
    return rgb.map(c => c / d)
  }

  if (reload) {
    width  = canvas.width = video.videoWidth * 1.5
    height = canvas.height = video.videoHeight * 1.5
    cellW = width / chop
    cellH = height / chop
    window.myReq = requestAnimationFrame(mainVideoLoop)
    reload = false
  } else {
    video.addEventListener('loadedmetadata', () => {
      width  = canvas.width = video.videoWidth * 1.5
      height = canvas.height = video.videoHeight * 1.5
      cellW = width / chop
      cellH = height / chop
      window.myReq = requestAnimationFrame(mainVideoLoop)
    })
  }
}
