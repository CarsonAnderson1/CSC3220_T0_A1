import {StyleSheet, Text, View, Pressable, Button, Modal, props, } from 'react-native'
function Transactions(){
    return(
        <Modal visible = {props.visible} animationType = "slide">
            <View style = {styles.appContainer}>
                <Text > SafeSpending </Text>
                <Text > 2000 </Text>
                <Button title = "+" > </Button>
            </View>
        </Modal>
        
    )
};
const styles = StyleSheet.create({
    appContainer: {
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 16
    },
    inputContainer: {
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
    goalContainer: {
      flex: 5
    }
  });
  
export default Transactions;