import { useState } from 'react'
import TickIcon from './TickIcon'
import Modal from './Modal'
import ProgressBar from './ProgressBar'

const ListItem = ({ task, getData }) => {

  const [showItem, setShowItem] = useState(true);

  const deleteItem = async () => {
    try {

      setShowItem(false);

      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,
        {
          method: "DELETE"
        })

      if (response.status === 200) {
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  }
  const [showModal, setShowModal] = useState(false);
  if (showItem) {
    return (
      <div className="list-item">
        <div className="info-container">
          <TickIcon progress={task.progress} />
          <p className="task-title">{task.title}</p>
          <ProgressBar progress={task.progress} />
        </div>

        <div className="button-container">
          <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
          <button className="delete" onClick={deleteItem}>DELETE</button>
        </div>
        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task} />}
      </div>
    )
  }
  else return (<></>);

}

export default ListItem