
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Modal, props, ScrollView} from 'react-native';
import Transactions from "./components/Transactions.js"
import Categories from "./components/Categories.js"
import { useState} from "react"
import * as SQLite from "expo-sqlite";

export default function App(props) {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [categoryIsVisible, setCategoryIsVisible] = useState(false);
  const [categories, setCategories] = useState([]); // array that holds categories list
  const [currCat, setCurrCat] = useState(undefined); //for the input box

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

  //DATABASE CODE PROTOTYPE
  const db = SQLite.openDatabase("app.db");

  useEffect(() => {
    db.transaction(tx => {
      let sqlcmd = "";
      sqlcmd += "CREATE TABLE IF NOT EXISTS categories";
      sqlcmd += "  (id INTEGER PRIMARY KEY AUTOINCREMENT,";
      sqlcmd += "   category TEXT)";
      tx.executeSql(sqlcmd);
    });

    db.transaction(tx => {
      let sqlcmd = "SELECT * FROM categories";
      tx.executeSql(sqlcmd, [],
        (_, resultSet) => {
          setCategories(resultSet.rows._array);  // results returned
        }
      );
    });

    setDataLoading(false);
     
  }, []);  // If an empty array is passed as a parameter useEffect only runs once.

  const addCategory = () => {
    db.transaction(tx => {
      let sqlcmd = "";
      sqlcmd += "INSERT INTO categories (category) values (?)";
      tx.executeSql(sqlcmd, [currCat],
          (_, resultSet) => {
          let existingCategories = [...categories];
          existingCategories.push({ id: resultSet.insertId, category: currCat});
          setCategories(existingCategories);
        })
    });
  }

  const showCategories = () => {
    return categories.map((assObj) => {
      return (
        <View key={assObj.id}> 
          <Text>{assObj.category}</Text>
        </View>
      );
    });
  };
  //DATABASE CODE PROTOTYPE

  return (
    <View style={styles.appContainer}>
      <StatusBar style='auto'/>
      <View style={styles.TitleContainer}>
        <Text style={styles.Title}>SafeSpending</Text>
      </View>
        <Transactions 
          visible = {modalIsVisible} 
          onCancel = {closeTransactionHandler}> 
        </Transactions>
        <View style={styles.MoneyDisplay}>
          <Text style = {styles.Money}>$2000.00</Text>
          <Button
            style={styles.InputButton}
            title = "+/-" 
            onPress = {startTransactionHandler} 
            color = "black"
          ></Button>
        </View>

        <Categories
          visibleC = {categoryIsVisible}
          onCancelC = {closeCategoriesHandler}>
        </Categories>
        <Button
          title = "Categories"
          onPress={startCategoriesHandler}
        ></Button>
      <View style={styles.CategoriesContainer}>
      <View style={styles.scrollAdjusts}>
                <ScrollView style={styles.scrollView}>
                  <View style = {styles.CategoryMoney}>
                    <Text style={{fontSize: 20}}>Groceries</Text>
                    <Text style={{fontSize: 20}}> $20 </Text>
                  </View>
                  <View style = {styles.CategoryMoney}>
                    <Text style={{fontSize: 20}}>Rent</Text>
                    <Text style={{fontSize: 20}}> $50 </Text>
                  </View>
                  <View style = {styles.CategoryMoney}>
                    <Text style={{fontSize: 20}}>Utilities</Text>
                    <Text style={{fontSize: 20}}> $100 </Text>
                  </View>
                  <View style = {styles.CategoryMoney}>
                    <Text style={{fontSize: 20}}>Dinners</Text>
                    <Text style={{fontSize: 20}}> $200</Text>
                  </View>
                  <View style = {styles.CategoryMoney}>
                    <Text style={{fontSize: 20}}>Gambling</Text>
                    <Text style={{fontSize: 20}}> $2000 </Text>
                  </View>
                </ScrollView>
                </View>
      </View>
    </View>
  );
}
//export {db};
export {addCategory};
export {showCategories};
export {currCat};
export {setCurrCat};

const styles = StyleSheet.create({
  appContainer: {
    flex: 6,
    backgroundColor: 'grey'
  },
  TitleContainer: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  Title: {
    fontSize: 30,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
 
  MoneyDisplay: {
    justifyContent:'flex-start',
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc"
  },
  Money: {
    fontSize: 50,
    fontWeight: "medium",
  },
  InputButton: {
    justifyContent:'flex-end',
    alignItems: 'flex-end',
  },
  CategoriesContainer: {
    flex: 2,
    backgroundColor: 'white',
  },
  CategoriesButton: {
    position: 'relative',
  },
  CategoryMoney: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",

  }
});
