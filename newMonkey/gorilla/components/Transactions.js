import {StyleSheet, Text, View, Button, Modal, props} from 'react-native'
import {useState} from "react"
import CreateTransaction from './TransactionsCreate';
function Transactions(props){
  const [tranIsVisible, setTranIsVisible] = useState(false);

    function newCreateTransactionHandler(){ // Goes to "TransactionsCreate" page
      setTranIsVisible(true);
    }
    function closeNewTransactionHandler(){ // Closes "TransactionsCreate" page
      setTranIsVisible(false);
    }

    return(
        <Modal visible = {props.visible} animationType = "slide">
           <CreateTransaction
            visible = {tranIsVisible}
            onCancel = {closeNewTransactionHandler}>
           </CreateTransaction>
            <Button title = "back" onPress = {props.onCancel}> </Button>
            <View style = {styles.appContainer}>
                <Text style = {styles.title} > SafeSpending </Text>
                <Text > 2000 </Text>
                <Button title = "+" > onPress = {newCreateTransactionHandler}</Button>
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
  
export default Transactions;