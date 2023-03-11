import {StyleSheet, Text, View, Button, Modal, props, TextInput} from 'react-native'
import {useState, useEffect} from "react"
import * as SQLite from "expo-sqlite";
export default function Delete(props){

  const [toDelete, setDelete] = useState(undefined)
  const [dataLoading, setDataLoading] = useState(true);
  const [name, setName] = useState([])
  const db = SQLite.openDatabase("categories.db");  // Open the db or create it if needed

  useEffect(() => {
    db.transaction(tx => {
      let sqlcmd = "";
      sqlcmd += "CREATE TABLE IF NOT EXISTS categories";
      sqlcmd += "  (id INTEGER PRIMARY KEY AUTOINCREMENT,";
      sqlcmd += "   name TEXT)";
      tx.executeSql(sqlcmd);
    });

    db.transaction(tx => {
      let sqlcmd = "SELECT * FROM categories";
      tx.executeSql(sqlcmd, [],
        (_, resultSet) => {
          setName(resultSet.rows._array);  // results returned
        }
      );
    });

    setDataLoading(false);
     
  }, []);  // If an empty array is passed as a parameter useEffect only runs once.

  if (dataLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading categories...</Text>
      </View>
    );
  }

  const deleteCategory = () => {
    db.transaction(tx => {
      let sqlcmd = ""; 
      sqlcmd += "DELETE FROM categories";
      //sqlcmd += toDelete;
      //sqlcmd += "'";

      tx.executeSql(sqlcmd, [toDelete],
        (_, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingName = [...name].filter(name => name.id != id);
            setName(existingName)
            setDelete(undefined);
          }
        })
    })
  }


    return(
        <Modal visible = {props.visibleD} animationType = "slide">
          <View style = {styles.buttons}>
            <View style={styles.backButton}>
              <Button
                color = "red"
                title = "cancel"
                onPress={props.onCancelD}
              />
            </View>
              <View style = {styles.confirmButton}>
                <Button title = "Confirm Deletion" color= "green" style = {styles.addButton} width = "40%" onPress = {deleteCategory}> </Button>
              </View>
          </View>

          <View style = {styles.appContainer}>
              <View style = {styles.box}>
                <Text style = {styles.textStyle}>
                  Input Category to Delete
                </Text>
                <TextInput 
                  style = {styles.textInput} 
                  placeholder ="ex. groceries" 
                  onChangeText = {setDelete}
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
