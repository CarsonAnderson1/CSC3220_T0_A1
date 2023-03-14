import {StyleSheet, Text, View, Button, Modal, props, ScrollView} from 'react-native'
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
      sqlcmd += "   money INTEGER,";
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

  const deleteCategory = (id) => {
    db.transaction(tx => {
      let sqlcmd = ""; 
      sqlcmd += "DELETE FROM categories WHERE id = ? ", [id];
      //sqlcmd += toDelete;
      //sqlcmd += "'";

      tx.executeSql(sqlcmd, [id],
        (_, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingName = [...name].filter(name => name.id != id);
            setName(existingName)
            setDelete(undefined);
          }
        })
    })
  }

  const showCategories = () => {
    return name.map((assObj) => {
      return (
        <View key={assObj.id} style={styles.display}> 
          <Text style={styles.textStyle}>
            {assObj.name}
          </Text>
          <View style={styles.deleteButton}>
            <Button
              color= 'red'
              title="delete"
              onPress={() => deleteCategory(assObj.id)}
            />
          </View>
        </View>
      );
    });
  };

  return(
    <Modal visible = {props.visibleD} animationType = "slide">
      <View style={styles.appContainer}>
        <View style = {styles.buttons}>
          <View style={styles.backButton}>
            <Button
              color = "red"
              title = "Close"
              onPress={props.onCancelD}
            />
          </View>
        </View>
        <View style={styles.title}>
          <Text style={styles.title}>Choose which category to delete</Text>
        </View>
        <ScrollView>
          <View style = {styles.categoryStyle}> 
            {showCategories()}
          </View>
        </ScrollView>
      </View>
    </Modal>
  )  
};

const styles = StyleSheet.create({
appContainer: {
  flex: 1,
  backgroundColor: '#1b1c1b',
},
title: {
  color: 'white',
  alignItems: 'center',
  fontSize: 19,
},
categoryStyle: {
  paddingTop: 10,
  paddingHorizontal: 16,
},
backButton: {
  flex: 2,
},
buttons: {
  flexDirection: "row",
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
box:{
  paddingBottom: 10,
},
deleteButton:{
  position: 'absolute',
  alignSelf: 'flex-end',
  alignItems: 'flex-end',
  paddingLeft: 300,
  paddingBottom: 2.5,
},
display:{
  flexDirection: "row",
  borderWidth: 1,
  backgroundColor: '#3a3d3a',
  borderRadius: 10,
},
textStyle:{
  fontSize: 30,
  color: "white",
  paddingLeft: 7,
}
});
