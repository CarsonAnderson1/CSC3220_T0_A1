import {StyleSheet, Text, View, Button, Modal, props, TextInput, ScrollView} from 'react-native'
import {useState, useEffect} from "react"
import * as SQLite from "expo-sqlite";

function AddCategory(props){
  const [dataLoading, setDataLoading] = useState(true);
  const [name, setName] = useState([]); // array that holds name list
  const [currName, setCurrName] = useState(undefined); // for text input box

  const db = SQLite.openDatabase("categories.db"); 

  useEffect(() => {
    db.transaction(tx => {
      let sqlcmd = "";
      sqlcmd += "CREATE TABLE IF NOT EXISTS categories";
      sqlcmd += "  (id INTEGER PRIMARY KEY AUTOINCREMENT,"
      sqlcmd += "   money INTEGER,";;
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
      sqlcmd += "INSERT INTO categories (money, name) values (0, ?)";
      tx.executeSql(sqlcmd, [currName],
          (_, resultSet) => {
          let existingName = [...name];
          existingName.push({ id: resultSet.insertId, name: currName, money: 0});
          setName(existingName);
        })
    });
  }

  const showCategories = () => {
    return name.map((assObj) => {
      return (
        <View key={assObj.id} style={styles.row}> 
          <Text style={{color: 'white', fontSize: 20, paddingLeft: 7}}>{assObj.name}</Text>
        </View>
      );
    });
  };

  return(
    <Modal visible = {props.visibleA} animationType = "slide">
      <View style = {styles.appContainer}>
        <View style = {styles.buttons}>
          <View style={styles.backButton}>
            <Button
              color = "red"
              title = "Close"
              onPress={props.onCancelA}
            />
          </View>
            <View style = {styles.confirmButton}>
              <Button
                title = "Confirm"
                color= "green"
                style = {styles.addButton}
                width = "40%"
                onPress = {addCategory}
              />
            </View>
        </View>
        <View style = {styles.box}>
          <Text style = {styles.textStyle}>
            Input Category to Create
          </Text>
          <TextInput 
            value = {currName}
            style = {styles.textInput}
            placeholder = "ex. groceries"
            placeholderTextColor={"white"}
            onChangeText = {setCurrName}
          />
        </View>
        <View style={styles.currentCategories}>
          <Text style={{color: 'white', fontSize: 20}}>Current Categories:</Text>
          <View style={styles.scrollAdjusts}>
            <ScrollView style={styles.scrollView}>
              <View style = {styles.column}>
                {showCategories()}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#1b1c1b',
  },
  backButton: {
    flex: 2,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingRight: 10
  },
  textInput: {
    borderWidth: 2,
    borderColor: "black",
    width: "70%",
    marginRight: 8,
    padding: 8,
    color: 'white',
    backgroundColor: '#3a3d3a',
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
    fontSize: 20,
    color: "white",
  },
  box:{
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  currentCategories: {
    paddingTop: 5,
    paddingLeft: 16,
  },
  scrollView: {
    backgroundColor: '#3a3d3a',
    marginHorizontal: 20,
    borderColor: 'black',
    borderWidth: 3,
  },
  scrollAdjusts: {
    height: 350,
    width: 350,
    paddingTop: 15,
    paddingRight: 7,
    paddingLeft: 30,
  },
});
export default AddCategory;