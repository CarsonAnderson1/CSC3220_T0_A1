import {StyleSheet, Text, View, Button, Modal, props, TextInput} from 'react-native'
import {useState} from "react"
function AddCategory(props){
    return(
        <Modal visible = {props.visibleA} animationType = "slide">
          <Button title = "back" onPress = {props.onCancelA} color = 'grey'> </Button>
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
export default AddCategory;