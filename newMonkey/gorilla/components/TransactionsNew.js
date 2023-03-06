import {StyleSheet, Text, View, Button, Modal, props} from 'react-native'
import {useState} from "react"
function createTransaction(props){

    return(
        <Modal visible = {props.tranVision} animationType = "slide">
            <View> 
                <Button title = "back" onPress = {props.tranCancel}> </Button>
            </View>
        </Modal>
        
    )
};
const styles = StyleSheet.create({
    title:{
      flex: 1,
      fontSize: 30,
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
    }
  });
  
export default createTransaction;