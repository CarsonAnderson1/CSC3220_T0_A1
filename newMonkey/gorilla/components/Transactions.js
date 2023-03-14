import {StyleSheet, Text, View, Button, Modal, props, ScrollView} from 'react-native'
import {useState, useEffect} from "react"
import CreateTransaction from './TransactionsCreate';
import * as SQLite from "expo-sqlite";

function Transactions(props){
  const [tranIsVisible, setTranIsVisible] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [transaction, setTransaction] = useState([]);

  const db = SQLite.openDatabase("categories.db"); 
  let totalMoney = 0;
  useEffect(() => {
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
     
  }, [tranIsVisible, setTranIsVisible]);

  
  if (dataLoading) {
    return (
      <View>
        <Text>Loading categories...</Text>
      </View>
    );
  }

  const showMoney = () => {
    return transaction.map(({id,money}) => {
        totalMoney += money;
    });
  };
  const showTransaction = () => {
    return transaction.map(({id,cat,money,date,note}) => {
      return (
          <View key = {id} style={transtyles.column}> 
            <Text color = "white">Category: {cat}, Money: {money}, Date: {date}, Note: {note}</Text>
          </View>
      );
    });
  };

  const deleteTransactions = () => {
    db.transaction(tx => {
      let sqlcmd = ""; 
      sqlcmd += "DELETE FROM transactions"
      tx.executeSql(sqlcmd,
        (_, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingTransaction = [...transaction].filter(transaction => transaction.id != id);
            setName(existingTransaction)
            setDelete(undefined);
          }
        })
    })
    transaction.map(() => {
        db.transaction(tx => {
          tx.executeSql("UPDATE categories SET money = 0")
        })
    
      });
    
  }
    function newCreateTransactionHandler(){ // Goes to "TransactionsCreate" page
      setTranIsVisible(true);
      {props.onCancel};
      
    }
    function closeNewTransactionHandler(){ // Closes "TransactionsCreate" page
      setTranIsVisible(false);
    }

    return(
        <Modal visible = {props.visible} animationType = "slide">
          <CreateTransaction
            visibleT = {tranIsVisible}
            onCancelT = {closeNewTransactionHandler}>
          </CreateTransaction>
          <View style = {transtyles.pageContainer}>
            <View style = {transtyles.buttons}>
              <Button 
              title = "Back" 
              color = '#474745'
              onPress = {props.onCancel}> 
              </Button>
              <Button 
              title = "Clear All" 
              color = 'red'
              onPress = {deleteTransactions}> 
              </Button>
            </View>
              <View style = {transtyles.titleContainer}>
                 <Text style = {transtyles.title} > Transactions </Text>
                  <View style = {transtyles.subTitleContainer}> 
                      <Text style = {transtyles.subtitleSizing}> $ </Text>
                      <Text style = {transtyles.subtitleSizing}> {showMoney()} </Text>
                      <Text style = {transtyles.subtitleSizing}> {totalMoney} </Text>
                      <View style = {transtyles.addButton}> 
                      <Button 
                      title = " + " 
                      color = '#10eb18'
                      onPress= {newCreateTransactionHandler}> </Button> 
                      </View>
                    </View>
              </View>  
              <View style={transtyles.transactionContainer}>
                <ScrollView style={transtyles.scrollView}>
                    <Text>Transaction History:</Text>
                    {showTransaction()}
                </ScrollView>
              </View>
            </View>
        </Modal>  
    )
};
const transtyles = StyleSheet.create({
    pageContainer: {
    backgroundColor: '#1b1c1b',
    flex: 1,
    },
    titleContainer: {
      flex: 2,
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 50,
      paddingHorizontal: 16,
      },
    title:{
      fontSize: 45,
      fontWeight: 600,
      color: 'white',
    },
    subTitleContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 15,
    },
    subtitleSizing:{
      fontSize: 40,
      fontWeight: 500,
      color: 'white'
    },
    buttons:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 40,
    },
    addButton:{
      alignItems: 'center',
      paddingTop: 5,
      paddingLeft: 10,
    },
    textInput: {
      borderWidth: 1,
      borderColor: "#cccccc",
      width: "70%",
      marginRight: 8,
      padding: 8
    },
    transactionContainer: {
      flex: 5,
      alignItems: 'stretch',
      paddingBottom: 100,
    },
    scrollView: {
      backgroundColor: '#3a3d3a',
      marginHorizontal: 20,
      borderColor: 'black',
      borderWidth: 3,
      alignContent: 'center'
    },
  });
  
export default Transactions;