import React, {useEffect} from 'react';
import { TouchableHighlight, Modal,  View, Text, StyleSheet, Button} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default function CalendarModal({modalVisible, setModalVisible, setDate}){
    
    return (
    <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>날짜를 고르세요</Text>

                    <Calendar
                        onDayPress={(day) => {setDate(day)}}
                    />
                    
                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                        onPress={() => {
                        setModalVisible(!modalVisible);
                        }}>
                        <Text style={styles.textStyle}>닫기</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    )
}  

const styles = StyleSheet.create({
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      }

});