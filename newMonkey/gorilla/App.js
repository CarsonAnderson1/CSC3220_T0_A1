
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
     
  }, [categoryIsVisible, setCategoryIsVisible], [transaction, setTransaction]);
  
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
        <View key={assObj.id}> 
          <Text style={styles.CategoryStyles}>
            {assObj.name} { "$" }{assObj.money}
          </Text>
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
      <View style={styles.TitleContainer}>
        <Text style={styles.Title}>SafeSpending</Text>
      </View>
      <Transactions 
        visible = {modalIsVisible} 
        onCancel = {closeTransactionHandler}> 
      </Transactions>
      <View style={styles.MoneyDisplay}>
        <Text style = {styles.Money}>
          {showMoney()}
        </Text>
        <Text style = {styles.Money}>
          $ {totalMoney}
        </Text>
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
          onPress={startCategoriesHandler}/>
      </View>
      <View style={styles.CategoriesContainer}>
        <View style={styles.scrollAdjusts}>
          {updateCategories()}
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
    paddingTop: 15,
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
  CategoriesButton: {
    paddingTop: 15,
    paddingLeft: 40,
    paddingRight: 40,
  },
  CategoryMoney: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  CategoryStyles: {
    color: 'white',
    paddingLeft: 7,
    paddingTop: 5,
  },
  scrollView: {
    backgroundColor: '#3a3d3a',
    marginHorizontal: 20,
    borderColor: '#080808',
    borderWidth: 5,
  },
  scrollAdjusts: {
    height: 270,
    width: 390,
    paddingTop: 5,
    paddingRight: 10,
    paddingLeft: 10,
  },
});