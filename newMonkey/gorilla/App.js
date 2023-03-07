
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Modal, props} from 'react-native';
import Transactions from "./components/Transactions.js"
import Categories from "./components/Categories.js"
import { useState} from "react"

export default function App(props) {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [categoryIsVisible, setCategoryIsVisible] = useState(false);

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
        <Text style={styles.Title}>Welcome</Text>
      </View>
      <View style = {styles.inputContainer}>
        <Transactions 
          visible = {modalIsVisible} 
          onCancel = {closeTransactionHandler}> 
        </Transactions>
        <View style={styles.MoneyDisplay}>
          <Text>2000</Text>
        </View>
        <View style={styles.InputButton}>
          <Button
            style={styles.InputButton}
            title = "transactions" 
            onPress = {startTransactionHandler} 
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
      </View>
      <View style={styles.CategoriesContainer}>

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
  inputContainer: {
    flex: .35,
    backgroundColor: 'yellow',
    flexDirection: 'column',
  },
  MoneyDisplay: {
    justifyContent:'flex-start',
    flex: 1,
    //Change this to view the whole thing as either row or column
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc"
  },
  InputButton: {
    justifyContent:'flex-end',
    alignItems: 'flex-end',
  },
  CategoriesContainer: {
    flex: 3,
  },
  CategoriesButton: {
    position: 'relative',
  },
});
