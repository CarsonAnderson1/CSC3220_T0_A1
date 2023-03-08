
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Modal, props, ScrollView} from 'react-native';
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
