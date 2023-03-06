
import { Button, StyleSheet, Text, View, TextInput, Modal, props} from 'react-native';
import Transactions from "./components/Transactions.js"
import Categories from "./components/Categories.js"
import { useState} from "react"
export default function App(props) {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [categoryIsVisible, setCategoryIsVisible] = useState(false);
  const [enteredGoalText, setEnteredText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

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
  function goalInputHandler(enteredText){
    setEnteredText(enteredText);
  }
  function addGoalHandler(){
    console.log(enteredGoalText);
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      enteredGoalText,
    ])
  }

  return (
    <View style={styles.appContainer}>
      <View style = {styles.inputContainer}>
        <Transactions 
          visible = {modalIsVisible} 
          onCancel = {closeTransactionHandler}> 
        </Transactions>
        <Categories
          visibleC = {categoryIsVisible}
          onCancelC = {closeCategoriesHandler}>
        </Categories>
        <TextInput 
          style = {styles.textInput} 
          placeholder = "Your Goal" 
          onChangeText={goalInputHandler} 
        />
        <Button 
          title = "Add Goal" 
          onPress = {(addGoalHandler)}
         />
        <Button 
          title = "transactions" 
          onPress = {startTransactionHandler} 
        ></Button>
        <Button
          title = "Categories"
          onPress={startCategoriesHandler}
        ></Button>
      </View>
      <View style = {styles.goalContainer}>
        {courseGoals.map((goal) => <Text key = {goal}>{goal}</ Text>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16
  },
  inputContainer: {
    flex: 1,
    //Change this to view the whole thing as either row or column
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc"
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8
  },
  goalContainer: {
    flex: 5
  }
});
