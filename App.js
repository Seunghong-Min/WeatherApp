//weather import 구간
import React from "react";
import Loading from "./Loading";
import * as Location from "expo-location";
import { Alert } from "react-native";
import axios from "axios";
import Weather from "./Weather";


/*to-do import 구간
import './App.css';
import {useState} from 'react';
import Template from "./components/Template";
import TodoList from "./components/TodoList";
import {MdAddCircle} from 'react-icons/md'
import TodoInsert from "./components/Todoinsert";

//to-do app.js 구간
let nextId = 4;

const App = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);
  const [todos,setTodos] = useState([
    {
      id: 1,
      text: "할일 1",
      checked: true
    },
    {
      id: 2,
      text: "할일 2",
      checked: false
    },
    {
      id: 3,
      text: "할일 3",
      checked: true
    }
  ]);

  const onInsertToggle = () => {
    if (selectedTodo) {
      setSelectedTodo(null);
    }
    setInsertToggle(prev => !prev);
  };

  const onInsertTodo = text => {
    if (text === "") {
      return alert('할 일을 입력해주세요.')
    } else {
      const todo = {
        id: nextId,
        text,
        checked: false
      }
      setTodos(todos => todos.concat(todo));
      nextId++;
    }
  }

  const onCheckToggle = (id) => {
    setTodos(todos => todos.map(todo => (todo.id === id ? {...todo, checked: !todo.checked} : todo)))
  }

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo)
  };

  const onRemove = id => {
    onInsertToggle();
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }

  const onUpdate = (id, text) => {
    onInsertToggle();
    setTodos(todos => todos.map(todo => todo.id === id ? {...todo, text} : todo))
  };

  return (
    <Template todoLength={todos.length}>
      <TodoList 
        todos={todos} 
        onCheckToggle={onCheckToggle}
        onInsertToggle={onInsertToggle} 
        onChangeSelectedTodo={onChangeSelectedTodo}
        />
      <div className="add-todo-button" onClick={onInsertToggle}>
        <MdAddCircle />
      </div>
      {insertToggle && (<
        TodoInsert
          selectedTodo={selectedTodo}
          onInsertToggle={onInsertToggle} 
          onInsertTodo={onInsertTodo}
          onRemove={onRemove} 
          onUpdate = {onUpdate}
        />
      )}
    </Template>
  );
};


//export default App;
*/
//weather 구간
const API_KEY = "33110bbb6f3eb8e5b3b429bc78ee27ab";

export default class extends React.Component {

    state = {
      isLoading: true
    };

    getWeather = async(latitude, longitude) => {
      const { 
        data: {
          main : {temp},
          weather
        } 
      } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        this.setState({ isLoading:false,
          condition: weather[0].main, 
          temp
        });
    };
    getLocation = async () => {
      try {
        await Location.requestPermissionsAsync();
        const { 
          coords: { latitude, longitude } 
        } = await Location.getCurrentPositionAsync();
        this.getWeather(latitude, longitude);
      
        //console.log(coords.latitude, coords.longitude);
        //const location = await Location.getCurrentPositionAsync();
        //console.log(location);
      }
      catch (error) {
        Alert.alert("Can't find you.", "So sad");
      }
}; 
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? <Loading /> : <Weather temp ={Math.round(temp)} condition={condition} />;
  }
}
