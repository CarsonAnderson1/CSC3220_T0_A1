import {StyleSheet, Text, View, Button, Modal, props, TextInput} from 'react-native'
import {useState} from "react"
function CreateTransaction(props){
  const[catVisible, setCatVisible] = useState('');
  const[monVisible, setMonVisible] = useState('');
  const[dateVisible, setDateVisible] = useState('');
  const[noteVisible, setNoteVisible] = useState('');
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
            <Button title = "back" onPress = {props.onCancelT}> </Button>
            <View styles = {styles.inputContainer}>
              <TextInput style = {styles.textInput} placeholder ="Input Category" onChangeText={handleCat}> </TextInput>
              <TextInput style = {styles.textInput} placeholder="Input Money Spent" onChangeText={handleMon}> </TextInput>
              <TextInput style = {styles.textInput} placeholder="Input Date" onChangeText={handleDate}> </TextInput>
              <TextInput style = {styles.textInput} placeholder="Input Note" onChangeText={handleNote}> </TextInput>
            </View>
          </View>
        </Modal>
        
    )
};

const styles = StyleSheet.create({
  title:{
    flex: 1,
    fontSize: 30,
    fontWeight: 600,
    alignItems: "center",
  },
  backButton:{
    flex: 2,
    
  },
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16
  },
  transactionContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc"
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8
  },
  transactionContainer: {
    flex: 5
  },
  inputContainer: {
    flex: 1,
    //Change this to view the whole thing as either row or column
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc"
  },
});
export default CreateTransaction;