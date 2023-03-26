import { useState } from 'react'
import TickIcon from './TickIcon'
import Modal from './Modal'
import ProgressBar from './ProgressBar'

const ListItem = ({ task, getData }) => {

  const deleteItem = async () => {
    try {

      const response = await fetch(`https://authentication-react-todo-app.herokuapp.com/todos/${task.id}`,
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

export default ListItem