import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { ThreeDots } from 'react-loader-spinner'

const Modal = ({ mode, setShowModal, getData, task }) => {

  const [cookies, setCookie, removeCookie] = useCookies(null);

  const editMode = mode === 'edit' ? true : false;

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 0,
    date: editMode ? task.date : new Date()
  })

  const postData = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {

        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data),

      }
      )
      if (response.status === 200) {
        console.log('WORKED')
        setShowModal(false);
        getData();

      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const editData = async (e) => {
    console.log('editted');
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }



  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(data => ({
      ...data,
      [name]: value
    }))
    console.log(data);
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3> <span style={{ textTransform: "capitalize" }}>{mode}</span> your task</h3>
          <button className="close-btn" onClick={() => setShowModal(false)}>X</button>
        </div>

        {isLoading &&
          <ThreeDots
            height="100%"
            radius="9"
            color="#fe91ff"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            wrapperClassName=""
            visible={true} />
        }
        {!isLoading &&

          <form>
            <input
              required
              maxLength={30}
              placeholder="Your task goes here"
              name="title"
              value={data.title}
              onChange={handleChange}
            />
            <label htmlFor="range">Drag to select your current progress</label>

            <input
              id="range"
              required
              type="range"
              min="0"
              max="100"
              name="progress"
              value={data.progress}
              onChange={handleChange}
            />

            <button className="modal-button" type="submit" onClick={editMode ? editData : postData}>{mode}</button>
          </form>
        }

      </div>
    </div>
  )
}

export default Modal