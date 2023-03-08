import {StyleSheet, Text, View, Button, Modal, props} from 'react-native'
import {useState} from "react"
import CreateTransaction from './TransactionsCreate';
function Transactions(props){
  const [tranIsVisible, setTranIsVisible] = useState(false);

    function newCreateTransactionHandler(){ // Goes to "TransactionsCreate" page
      setTranIsVisible(true);
      {props.onCancel};
      
    }
    function closeNewTransactionHandler(){ // Closes "TransactionsCreate" page
      setTranIsVisible(false);
    }

    return(
        <Modal visible = {props.visible} animationType = "slide">
          <CreateTransaction
            visibleT = {tranIsVisible}
            onCancelT = {closeNewTransactionHandler}>
          </CreateTransaction>
          <View style = {transtyles.backButton}>
          <Button title = "back" onPress = {props.onCancel}> </Button>
          </View>
            <View style = {transtyles.titleContainer}>
                <Text style = {transtyles.title} > SafeSpending </Text>
                <View style = {transtyles.subTitleContainer}> 
                    <Text style = {transtyles.subtitleSizing}> $ </Text>
                    <Text style = {transtyles.subtitleSizing}> 2000.00 </Text>
                    <View style = {transtyles.addButton}> 
                    <Button title = " + " onPress= {newCreateTransactionHandler}> </Button> 
                    </View>
                    {/* <Button title = " + " onPress= {newCreateTransactionHandler}> </Button> */}
                </View>
            </View> 
            {/* <View style = {transtyles.addButton}>
                <Button title = " + " onPress = {newCreateTransactionHandler}> </Button>
            </View> */}
        </Modal>
        
    )
};
const transtyles = StyleSheet.create({
    
    titleContainer: {
        flex: 5,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 16,
      },
    title:{
      fontSize: 45,
      fontWeight: 600,
    },
    subTitleContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
    },
    subtitleSizing:{
        fontSize: 40,
        fontWeight: 500,
        // backgroundColor: 'red',
    },
    backButton:{
        alignItems: 'flex-start',
        paddingTop: 35,
        paddingLeft: 15,
    },
    addButton:{
        alignItems: 'center',
        paddingTop: 12,
        paddingLeft: 10,
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