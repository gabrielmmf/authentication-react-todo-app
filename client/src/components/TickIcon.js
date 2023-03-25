import { ReactComponent as CompleteCheck } from '../assets/checkmark.svg'
import { ReactComponent as IncompleteCheck } from '../assets/checkmark-complete.svg'

const TickIcon = ({ progress }) => {
  console.log(progress);
  return (
    <>
      {progress >= 100 ? <IncompleteCheck /> : <CompleteCheck />}
    </>

  )
}

export default TickIcon