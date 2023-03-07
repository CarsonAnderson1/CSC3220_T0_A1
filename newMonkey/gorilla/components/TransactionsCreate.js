import {StyleSheet, Text, View, Button, Modal, props, TextInput} from 'react-native'
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
            <View styles = {styles.appContainer}>
              <Button style = {styles.backButton} title = "back" onPress = {props.onCancelT} color = 'grey' > </Button>
              <View styles = {styles.inputContainer}>
                <Text>
                  Input Category
                </Text>
                <TextInput 
                  style = {styles.textInput} 
                  placeholder ="ex. groceries" 
                  onChangeText={handleCat}
                />
              </View>

              <Text>
                Input Money Amount
              </Text>
              <TextInput 
                style = {styles.textInput} 
                placeholder="ex. 100.49" 
                onChangeText={handleMon}
              />
              <Text>
                Input Date
              </Text>
              <TextInput 
                style = {styles.textInput} 
                placeholder="ex. 03/06/2023" 
                onChangeText={handleDate}
              />
              <Text>
                Input Note
              </Text>
              <TextInput 
                style = {styles.textInput} 
                placeholder="ex. dinner party" 
                onChangeText={handleNote}
              />
            </View>
            <Button title = "Add Transaction" color= "grey" style = {styles.addButton}> </Button>
          
        </Modal>
        
    )
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  backButton: {
    flex: 2,
  },
  inputContainer: {
    flexDirection: "row",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  
});
export default CreateTransaction;