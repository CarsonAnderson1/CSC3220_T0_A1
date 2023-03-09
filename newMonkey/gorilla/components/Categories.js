import { ScrollView } from 'react-native';
import { Button, StyleSheet, Text, View, Modal } from 'react-native';
import {useState} from "react"
import AddCategory from './CategoriesAdd';
import Delete from './CategoriesDelete';
import SQlite from 'react-native-sqlite-storage';

function Categories(props) {


  const[addIsVisible, setAddIsVisible] = useState(false);
  const[deleteIsVisible, setDeleteIsVisible] = useState(false);
  const[money, setMoney] = useState(0);
  const[name, setName] = useState("");

  useEffect(() => { // Calls our Sqlite functions immediately
    getData();
  }, [])

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
  const getData = () => {
    try{
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT Name, Money FROM Categories",
          [],
          (tx, results) => {
            var len = results.rows.length;
            if(len > 0) {
              var userName = results.row.item(0).Name;
              var userMoney = results.row.item(0).Money;
              setMoney(userMoney);
              setName(userName);
            }
          }
        )
      })
    }
    catch(error){
      console.log(error);
    }
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
            <Text style={{fontSize: 50}}>SafeSpending</Text>
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
                <ScrollView style={styles.scrollView}>
                <Text> {money}</Text>
                  
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

export default Categories;