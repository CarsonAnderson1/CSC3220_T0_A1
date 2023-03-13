import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Modal, props, ScrollView} from 'react-native';
import Transactions from "./components/Transactions.js"
import Categories from "./components/Categories.js"
import { useState, useEffect} from "react"
import * as SQLite from "expo-sqlite";
export default function App(props) {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [categoryIsVisible, setCategoryIsVisible] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [name, setName] = useState([]); // array that holds name list


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
      <View style>
        <Text>Loading categories...</Text>
      </View>
    );
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

  function startTransactionHandler(){ // Opens the "Transactions" Page
    setModalIsVisible(true);
    
  }
  function closeTransactionHandler(){ // Closes the "Transactions" Page
    setModalIsVisible(false);
  }
  function startCategoriesHandler(){ // Opens the "Categories" Page
    setCategoryIsVisible(true);
    
  }
  function closeCategoriesHandler(){ // Closes the "Categories" Page
    setCategoryIsVisible(false);
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.TitleContainer}>
        <Text style={styles.Title}>SafeSpending</Text>
      </View>
        <Transactions 
          visible = {modalIsVisible} 
          onCancel = {closeTransactionHandler}> 
        </Transactions>
      <View style={styles.MoneyDisplay}>
          <Text style = {styles.Money}>$ 2000.00 </Text>
          <View style ={styles.InputButton}>
          <Button
            title = "+/-" 
            onPress = {startTransactionHandler} 
            color = "#10eb18">
            </Button>
          </View>
      </View>
      <Categories
        visibleC = {categoryIsVisible}
        onCancelC = {closeCategoriesHandler}>
      </Categories>

      <View style = {styles.CategoriesButton}>
        <Button 
          title = "Categories"
          color = 'red'
          onPress={startCategoriesHandler}>
        </Button>
      </View>
      <View style={styles.CategoriesContainer}>
        <View style={styles.scrollAdjusts}>
                <ScrollView style={styles.scrollView}>
                 {showCategories()}
                </ScrollView>
                </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#1b1c1b'
  },
  TitleContainer: {
    paddingTop: 70,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  Title: {
    fontSize: 50,
    fontWeight: 500,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    color: 'white'
  },
  MoneyDisplay: {
    justifyContent:'flex-start',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  Money: {
    fontSize: 50,
    fontWeight: "medium",
    color: 'white',
  },
  InputButton: {
    justifyContent:'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  CategoriesContainer: {
    backgroundColor: 'white',
    paddingLeft: 40,
    paddingRight: 40,
  },
  CategoriesButton: {
    paddingTop: 15,
    paddingLeft: 40,
    paddingRight: 40,
    // width: 100,
    // height: 100,
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 10,
    // borderRadius: 100,
    // backgroundColor: 'orange',
  },
  CategoryMoney: {
    flexDirection: "row",
    justifyContent: "space-between",

  }
});
