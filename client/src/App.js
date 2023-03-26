import ListHeader from "./components/ListHeader";
import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import ListItem from './components/ListItem'
import Auth from "./components/Auth";

const App = () => {

  const [cookies] = useCookies(null);

  const authToken = cookies.AuthToken

  const userEmail = cookies.Email

  const [tasks, setTasks] = useState(null);


  const getData = async () => {

    try {

      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);

      const json = await response.json();

      console.log(json);

      setTasks(json);

    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {

    if (authToken) {
      getData();
    }

  }, []);

  console.log(tasks);

  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));


  return (
    <div className="app" >
      {!authToken && <Auth />}
      {authToken &&
        <div className="todo-container">
          <p className="user-email">Welcome back {userEmail} </p>
          <ListHeader listName={'TODO LIST'} getData={getData} />
          {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}

        </div>
      }
    </div>
  );
}

export default App;
