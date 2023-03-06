import {StyleSheet, Text, View, Button, Modal, props, TextInput } from 'react-native'
function closeCreateTransactionHandler(){ // Closes the "Transactions" Page
    setModalIsVisible(false);
  }
function createTransaction(props){
    return(
        <Modal visible = {props.visible} animationType = "slide">
            <Button title = "X" onPress = {props.onCancel}> </Button>
            <View style = {styles.appContainer}>
                <Text style = {styles.transactionContainer} > Create Transaction </Text>
                <TextInput> style = {styles.textInput} placeholder = "Input Date" </TextInput>
                <TextInput> style = {styles.textInput} placeholder = "Input Amount" </TextInput>
                <TextInput> style = {styles.textInput} placeholder = "Input Category" </TextInput>
                <TextInput> style = {styles.textInput} placeholder = "Input Note" </TextInput>
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