import {StyleSheet, Text, View, Button, Modal, props, TextInput} from 'react-native'
export default function Delete(props){
    return(
        <Modal visible = {props.visibleD} animationType = "slide">
          <Button title = "back" onPress = {props.onCancelD} color = 'grey'> </Button>
          <View style = {styles.appContainer}>
            <View styles = {styles.boxes}>
              <Text styles>
                Input Category to Delete
              </Text>
              <TextInput 
                style = {styles.textInput} 
                placeholder ="ex. groceries" 
                
              />
              <Button title = "confirm" color = 'grey'> </Button>
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
