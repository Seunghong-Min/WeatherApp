import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import styled, { ThemeProvider } from 'styled-components/native';
import { StatusBar, Dimensions } from 'react-native';
import Input from './components/TodoInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from "./components/Task" 
import AppLoading from "expo-app-loading";
import { theme } from './theme';

const List = styled.ScrollView`
   width: 80%;
   margin-bottom: 50px;
`;

const Title = styled.Text`
font-size: 40px;
font-weight: 600;
color: ${({ theme }) => theme.main};
align-self: flex-start;
margin: 20px;
`;

const TodoList =()=>{
    const width = Dimensions.get('window').width;
    const [isReady, setIsReady] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState({});
    const _saveTasks = async tasks => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
        } catch (e) {
            console.error(e);
        }
    };

    const _loadTasks = async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        console.log("loaded", loadedTasks)
        setTasks(JSON.parse(loadedTasks || '{}'));
    };

    const _addTask = () => {
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID]: { id: ID, text: newTask, completed: false },
        };
        setNewTask('');
        _saveTasks({ ...tasks, ...newTaskObject });
    };
    
    const _deleteTask = id => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        _saveTasks(currentTasks);
    };

    const _toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        _saveTasks(currentTasks);
    };

    const _updateTask = item => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item;
        _saveTasks(currentTasks);
    };

    const _handleTextChange = text => {
        setNewTask(text);
    };

    const _onBlur = () => {
        setNewTask('');
    };


    console.log(tasks)

    return isReady ? ( <ThemeProvider theme={theme}>
    {/* <Title>TODO List</Title> */}
        <Input placeholder="+ Add a Task" 
            value={newTask}
            onChangeText={_handleTextChange}
            onSubmitEditing={_addTask}
            onBlur={_onBlur}
            />
        <List >
            {Object.values(tasks)
            .reverse()
            .map(item => (
                <Task 
                    key={item.id} 
                    item={item} 
                    deleteTask={_deleteTask} 
                    toggleTask={_toggleTask}
                    updateTask={_updateTask}
                />
            ))}
        </List>
    </ThemeProvider>
    )
    : (
        <AppLoading
            startAsync={_loadTasks}
            onFinish={() => setIsReady(true)}
            onError={console.error}
        />
    )
}

export default TodoList

