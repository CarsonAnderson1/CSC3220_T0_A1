import {StyleSheet, Text, View, Button, Modal, props, TextInput} from 'react-native'
import {useState, useEffect} from "react"
import * as SQLite from "expo-sqlite";

function AddCategory(props){
  const [dataLoading, setDataLoading] = useState(true);
  const [name, setName] = useState([]); // array that holds name list
  const [currName, setCurrName] = useState(undefined); // for text input box
  const reload=()=>window.location.reload();

  const db = SQLite.openDatabase("categories.db"); 

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
     
  }, []);
  
  if (dataLoading) {
    return (
      <View>
        <Text>Loading categories...</Text>
      </View>
    );
  }

  const addCategory = () => {
    db.transaction(tx => {
      let sqlcmd = "";
      sqlcmd += "INSERT INTO categories (name) values (?)";
      tx.executeSql(sqlcmd, [currName],
          (_, resultSet) => {
          let existingName = [...name];
          existingName.push({ id: resultSet.insertId, name: currName});
          setName(existingName);
        })
    },reload);
  }

  const showCategories = () => {
    return name.map((assObj) => {
      return (
        <View key={assObj.id} style={styles.row}> 
          <Text>{assObj.name}</Text>


        </View>
      );
    });
  };


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
                <Button  title = "Confirm Creation" color= "green" style = {styles.addButton} width = "40%" onPress = {addCategory}> </Button>
              </View>
          </View>

          <View style = {styles.appContainer}>
              <View style = {styles.box}>
                <Text style = {styles.textStyle}>
                  Input Category to Create
                </Text>
                <TextInput 
                  value = {currName}
                  style = {styles.textInput} 
                  placeholder = "ex. groceries" 
                  onChangeText = {setCurrName}
                />
              </View>
              <View style = {styles.column}>{showCategories()}</View>
 
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