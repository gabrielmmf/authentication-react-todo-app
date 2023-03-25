const ProgressBar = ({ progress }) => {
  return (
    <div className="outer-bar">
      <div className="inner-bar"
        style={{ width: `${progress}%`, backgroundColor: (progress >= 100) && '#0f0' }}
      >
      </div>
    </div>
  )
}

export default ProgressBar