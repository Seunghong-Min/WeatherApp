import React, {useState} from "react";
import { StyleSheet, View, Text, StatusBar, TouchableOpacity,TextInput } from "react-native";
import PropTypes from "prop-types";
import axios from "axios";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Input from "./components/Input";
import styled, {ThemeProvider} from 'styled-components/native';
import TodoList from './TodoList';


const weatherOptions = {
    Thunderstorm: {
      iconName: "weather-lightning",
      gradient: ["#373B44", "#4286f4"],
      /*title: "Thunderstorm in the house",
      subtitle: "Actually, outside of the house"*/
    },
    Drizzle: {
      iconName: "weather-hail",
      gradient: ["#89F7FE", "#66A6FF"],
      /*title: "Drizzle",
      subtitle: "Is like rain, but gay 🏳️‍🌈"*/
    },
    Rain: {
      iconName: "weather-rainy",
      gradient: ["#00C6FB", "#005BEA"],
      /*title: "비가 오네요∵!",
      subtitle: "외출 시 우산을 반드시 챙겨주세요!:)"*/
    },
    Snow: {
      iconName: "weather-snowy",
      gradient: ["#7DE2FC", "#B9B6E5"],
      /*title: "Cold as balls",
      subtitle: "Do you want to build a snowman? Fuck no."*/
    },
    Atmosphere: {
      iconName: "weather-sunny",
      gradient: ["#89F7FE", "#66A6FF"]
    },
    Clear: {
      iconName: "weather-sunny",
      gradient: ["#FF7300", "#FEF253"],
      /*title: "Sunny as fuck",
      subtitle: "Go get your ass burnt"*/
    },
    Clouds: {
      iconName: "weather-cloudy",
      gradient: ["#D7D2CC", "#304352"],
      /*title: "Clouds",
      subtitle: "I know, fucking boring"*/
    },
    Mist: {
      iconName: "weather-hail",
      gradient: ["#4DA0B0", "#D39D38"],
      /*title: "Mist!",
      subtitle: "It's like you have no glasses on."*/
    },
    Dust: {
      iconName: "weather-hail",
      gradient: ["#4DA0B0", "#D39D38"],
      /*title: "Dusty",
      subtitle: "Thanks a lot China 🖕🏻"*/
    },
    Haze: {
      iconName: "weather-hail",
      gradient: ["#4DA0B0", "#D39D38"],
      /*title: "Haze",
      subtitle: "Just don't go outside."*/
    }
  };

export default function Weather({ temp, condition }) {

  const[value, onChangeText] = React.useState('값');
  /*state = {
    text: '',
    inputText: ''
 
  }
 
  submitBtn = () => {
    this.setState({text: this.state.inputText});
  }   
*/

    return (
    
    <LinearGradient
        // Background Linear Gradient
        colors={weatherOptions[condition].gradient}
        style={styles.container} >
          
            <StatusBar barStyle="light-content"/>
        <View style={styles.halfContainer}>
            <MaterialCommunityIcons 
            size = {96} 
            name={weatherOptions[condition].iconName || "weather-sunset"}
            color= "white" />
            <Text style={styles.temp}>{temp}˚c</Text>
            <TodoList></TodoList>

            {/* <TextInput
            style={styles.textInput}
            onChangeText={(text) => onChangeText(text)}
            value={value}
            placeholder="아무거나 입력해주세요."
            />
            */}
        </View>
  
        {/*<View style={styles.item}>
          <View style={styles.itemLeft}>
              <TouchableOpacity style={styles.square}></TouchableOpacity>
              <Text style={styles.itemText}>{props.text}</Text>
          </View>
          <View style={styles.circular}></View>
        </View>*/}
        </LinearGradient>
        
    );

}


Weather.propTypes = {
    temp: PropTypes.number.isRequired,
    condition: PropTypes.oneOf([
    "Thunderstrom", 
    "Drizzle", 
    "Rain", 
    "Snow", 
    "Clear", 
    "Atmosphere",
    "Clouds",
    "Haze",
    "Mist",
    "Dust",
    "Weather-hazy"
    ]).isRequired
};


const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    temp: {
        fontSize: 42,
        color: "white"
    },
    halfContainer: { 
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    },

    item:{},
    itemLeft:{},
    square:{},
    itemText:{},
    circular:{}

   /* title: {
        color: "white",
        fontSize: 44,
        fontWeight: "300",
        marginBottom: 10,
        textAlign: "left"
      },
      subtitle: {
        fontWeight: "600",
        color: "white",
        fontSize: 24,
        textAlign: "left"
      },
      textContainer: {
        alignItems: "flex-start",
        paddingHorizontal: 40,
        justifyContent: "center",
        flex: 1
      }*/

});