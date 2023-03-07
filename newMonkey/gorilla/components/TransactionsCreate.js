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
          <Button title = "back" onPress = {props.onCancelT} color = 'grey'> </Button>
          <View style = {styles.appContainer}> 
            <View styles = {styles.inputContainer}>
              <View styles = {styles.boxes}>
              <Text styles>
                Input Category
              </Text>
              <TextInput 
                style = {styles.textInput} 
                placeholder ="ex. groceries" 
                onChangeText={handleCat}
              />
              </View>
              <Text styles>
                Input Money Amount
              </Text>
              <TextInput 
                style = {styles.textInput} 
                placeholder="ex. 100.49" 
                onChangeText={handleMon}
              />
              <Text styles>
                Input Date
              </Text>
              <TextInput 
                style = {styles.textInput} 
                placeholder="ex. 03/06/2023" 
                onChangeText={handleDate}
              />
              <Text styles>
                Input Note
              </Text>
              <TextInput 
                style = {styles.textInput} 
                placeholder="ex. dinner party" 
                onChangeText={handleNote}
              />
              <Button title = "Add Transaction" color= "grey"> </Button>
            </View>
          </View>
        </Modal>
        
    )
};

const styles = StyleSheet.create({
  backButton:{
    flex: 2,
    
  },
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
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
    borderBottomColor: "#cccccc",
  },
  boxes:{
    flex: 2,
    flexDirection: "row",

  },
  addButton:{
    
  }
});
export default CreateTransaction;