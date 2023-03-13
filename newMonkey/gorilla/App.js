
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
  const [transaction, setTransaction] = useState([]);
  const db = SQLite.openDatabase("categories.db"); 
  let totalMoney = 0;

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

    db.transaction(tx => {
      let sqlcmd = "";
      sqlcmd += "CREATE TABLE IF NOT EXISTS transactions";
      sqlcmd += "  (id INTEGER PRIMARY KEY AUTOINCREMENT,";
      sqlcmd += "   cat TEXT,";
      sqlcmd += "   money INT,";
      sqlcmd += "   date TEXT,";
      sqlcmd += "   note TEXT)";
      tx.executeSql(sqlcmd);
    });

    db.transaction(tx => {
      let sqlcmd = "SELECT * FROM transactions";
      tx.executeSql(sqlcmd, [],
        (_, resultSet) => {
          setTransaction(resultSet.rows._array);  // results returned
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
    updateCategories();
    return name.map((assObj) => {
      return (
        <View key={assObj.id} style={styles.row}> 
          <Text>{assObj.name} {assObj.money}</Text>


        </View>
      );
    });
  };
  const updateCategories = () => {
    return transaction.map(({cat, money}) => {
      db.transaction(tx => {
        tx.executeSql("UPDATE categories SET money = ? WHERE name = ?", [money, cat])
        tx.executeSql("SELECT * from transactions", [], (_, { rows }) =>
          console.log(JSON.stringify(rows)),
        );
        tx.executeSql("SELECT * from categories", [], (_, { rows }) =>
          console.log(JSON.stringify(rows)),
        );
      })
  
    });
  };
  const showMoney = () => {
    return transaction.map(({money}) => {
        totalMoney += money;
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
      <StatusBar style='auto'/>
      <View style={styles.TitleContainer}>
        <Text style={styles.Title}>SafeSpending</Text>
      </View>
        <Transactions 
          visible = {modalIsVisible} 
          onCancel = {closeTransactionHandler}> 
        </Transactions>
        <View style={styles.MoneyDisplay}>
          
          <Text style = {styles.Money}>{showMoney()}</Text>
          <Text style = {styles.Money}>{totalMoney}</Text>
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
                 {showCategories()}
                </ScrollView>
                </View>
      </View>
    </View>
  );
}



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