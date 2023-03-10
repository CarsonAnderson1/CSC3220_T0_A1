import {StyleSheet, Text, View, Button, Modal, props, TextInput} from 'react-native'
import {useState, useEffect} from "react"
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase(
  {
      name: 'MainDB',
      location: 'default',
  },
  () => { },
  error => { console.log(error) }
);
function AddCategory(props){
  const [name, setName] = useState('');

  const nameHandler = (catName) => {
    setName(catName);
  }

  useEffect(() => {
    createTable();
    getData();
  }, []);

  const createTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            + "Categories"
            + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Money INTEGER);"
        )
    })
}
const getData = () => {
  try {
      db.transaction((tx) => {
          tx.executeSql(
              "SELECT Name, Money FROM Categories",
              [],
              (tx, results) => {
                  var len = results.rows.length;
                  if (len > 0) {
                      {props.onCancelA}
                  }
              }
          )
      })
  } catch (error) {
      console.log(error);
  }
}
const setData = () => {
  if (name.length == 0) {
      console.log("nothing entered")
  } else {
      
        db.transaction((tx) => {
        tx.executeSql(
        "INSERT INTO Categories (Name, Money) VALUES (?,0)",
        [name]
        );
      })
        {props.onCancelA}
      }   
}

    return(
        <Modal visible = {props.visibleA} animationType = "slide">
          <View style = {styles.buttons}>
            <View style={styles.backButton}>
              <Button
                color = "red"
                title = "cancel"
                onPress={props.onCancelA}
              />
            </View>
              <View style = {styles.confirmButton}>
                <Button  title = "Confirm Creation" color= "green" style = {styles.addButton} width = "40%" onPress = {setData}> </Button>
              </View>
          </View>

          <View style = {styles.appContainer}>
              <View style = {styles.box}>
                <Text style = {styles.textStyle}>
                  Input Category to Create
                </Text>
                <TextInput 
                  style = {styles.textInput} 
                  placeholder ="ex. groceries" 
                  onChangeText={nameHandler}
                />
              </View>
            </View>
        </Modal>
        
    )
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  backButton: {
    flex: 2,
  },
  buttons: {
    flexDirection: "row",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  backButton:{
    alignItems: 'flex-start',
    paddingTop: 35,
    paddingBottom: 10,
    paddingLeft: 15,
  },
  confirmButton:{
    alignItems: 'flex-start',
    paddingTop: 35,
    paddingBottom: 10,
    paddingLeft: 30,
  },
  textStyle:{
    fontSize: 14,
    fontFamily: "normal",
    color: "black",
  },
  box:{
    paddingBottom: 10,
  }
});
export default AddCategory;