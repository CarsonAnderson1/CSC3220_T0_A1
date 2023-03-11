import { ScrollView } from 'react-native';
import { Button, StyleSheet, Text, View, Modal } from 'react-native';
import {useState, useEffect} from "react"
import AddCategory from './CategoriesAdd';
import Delete from './CategoriesDelete';
import * as SQLite from "expo-sqlite";



export default function Categories(props) {
  const [dataLoading, setDataLoading] = useState(true);
  const[addIsVisible, setAddIsVisible] = useState(false);
  const[deleteIsVisible, setDeleteIsVisible] = useState(false);
  const[name, setName] = useState([]);

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
      <View style={styles.container}>
        <Text>Loading categories...</Text>
      </View>
    );
  }
  
  const showCategories = () => {
    return name.map((assObj) => {
      return (
        <View key={assObj.id} style={styles.row}> 
        <ScrollView>
          <Text>{assObj.name}</Text>
        </ScrollView>
          
        </View>
      );
    });
  };
  

  function addCategory(){
    setAddIsVisible(true);
    {props.onCancelC}
  }
  function removeAddCategory(){
    setAddIsVisible(false);
  }
  function deleteCategory(){
    setDeleteIsVisible(true);
    {props.onCancelC}
  }
  function removeDeleteCategory(){
    setDeleteIsVisible(false);
  }
  
  
  return (
    <Modal visible={props.visibleC} animationType="slide">
      <AddCategory
        visibleA = {addIsVisible}
        onCancelA = {removeAddCategory}>
      </AddCategory>
      <Delete
        visibleD = {deleteIsVisible}
        onCancelD = {removeDeleteCategory}>
      </Delete>
        <View style={styles.appContainer}>
          
            <View style={styles.homeButton}>
                <Button
                    title="Home"
                    color='#474745'
                    onPress={props.onCancelC}
                />
            </View>

        <View style={styles.title}>
            <Text style={{fontSize: 50}}>Categories</Text>
        </View>

        <View style={styles.rowContainer}>
            <View style={styles.buttonsContainer}>
                <View style={styles.addButton}>
                    <Button
                        title="+"
                        color='#10eb18'
                        onPress = {addCategory}
                    />
                </View>

                <View style={styles.removeButton}>
                    <Button
                        title="-"
                        color='#e30707'
                        onPress= {deleteCategory}
                    />
                </View>
        </View>
            
            <View style={styles.scrollAdjusts}>
                
                   <Text>{showCategories()}</Text> 
                    
             
                </View>
            </View>
        </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rowContainer: {
    flexDirection: 'row-reverse',
  },
  buttonsContainer: {
    flexDirection: 'column',
  },
  title: {
    alignItems: 'center',
  },
  homeButton: {
    alignItems: 'flex-start',
    paddingTop: 35,
    paddingLeft: 15,
  },
  scrollView: {
    backgroundColor: '#d4d9d6',
    marginHorizontal: 20,
    borderColor: '#080808',
    borderWidth: 2,
  },
  scrollAdjusts: {
    height: 420,
    width: 390,
    paddingTop: 40,
    paddingRight: 10,
    paddingLeft: 40,
  },
  addButton: {
    alignItems: 'flex-end',
    paddingTop: 115,
    paddingRight: 35,
    paddingLeft: 5,
  },
  removeButton: {
    alignItems: 'flex-end',
    paddingTop: 55,
    paddingRight: 35,
    paddingLeft: 5,
  }
});

