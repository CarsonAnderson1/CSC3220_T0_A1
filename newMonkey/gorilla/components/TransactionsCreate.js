import {StyleSheet, Text, View, Button, Modal, props, TextInput,Font} from 'react-native'
import {useState} from "react"
function CreateTransaction(props){
  const[catVisible, setCatVisible] = useState('');
  const[monVisible, setMonVisible] = useState('');
  const[dateVisible, setDateVisible] = useState('');
  const[noteVisible, setNoteVisible] = useState('');
  const[transaction,setTransaction] = useState([]);

  function handleCat(enteredCatText){
    setCatVisible(enteredCatText);
  }
  function handleMon(enteredMonText){
    setMonVisible(enteredMonText);
  }
  function handleDate(enteredDateText){
    setDateVisible(enteredDateText);
  }
  function handleNote(enteredNoteText){
    setNoteVisible(enteredNoteText);
  }
  

  
    return(
        <Modal visible = {props.visibleT} animationType = "slide">
          <View style = {styles.appContainer}>
            <View style = {styles.buttons}>
              <View style={styles.backButton}>
                <Button
                  color = "red"
                  title = "cancel"
                  onPress={props.onCancelT}
                />
              </View>
              <View style = {styles.confirmButton}>
                <Button 
                title = "Confirm" 
                color= "green" 
                style = {styles.addButton} 
                width = "40%" 
                />
              </View>
            </View> 
            <View style = {styles.appContainer}>
              <View style = {styles.box}>
                <Text style = {styles.textStyle}>
                  Input Category
                </Text>
                <TextInput 
                  style = {styles.textInput} 
                  placeholder ="ex. groceries" 
                  onChangeText={handleCat}
                />
                <Text style = {styles.textStyle}>
                  Input Money Amount  
                </Text>
                <TextInput 
                  style = {styles.textInput} 
                  placeholder="ex. 100.49" 
                  onChangeText={handleMon}
                />
                <Text style = {styles.textStyle}>
                  Input Date
                </Text>
                <TextInput 
                  style = {styles.textInput} 
                  placeholder="ex. 03/06/2023" 
                  onChangeText={handleDate}
                />
                <Text style = {styles.textStyle}>
                  Input Note
                </Text>
                <TextInput 
                  style = {styles.textInput} 
                  placeholder="ex. dinner party" 
                  onChangeText={handleNote}
                />
            </View>
            </View>
          </View>
        </Modal>
        
    )
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#1b1c1b',
  },
  backButton: {
    // flex: 2,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  textInput: {
    borderWidth: 2,
    borderColor: "black",
    width: "70%",
    padding: 8,
    backgroundColor: '#3a3d3a',
  },
  backButton:{
    alignItems: 'flex-start',
    paddingTop: 35,
    paddingBottom: 10,
    paddingLeft: 15,
  },
  confirmButton:{
    paddingTop: 35,
    paddingBottom: 10,
    paddingLeft: 100,
  },
  textStyle:{
    fontSize: 16,
    color: "white",
    paddingBottom: 10,
    paddingTop: 10
  },
  box:{
    paddingBottom: 10,
    flexDirection: 'column', 
    alignItems: 'center',
    padding: 8,
  }
  
});
export default CreateTransaction;