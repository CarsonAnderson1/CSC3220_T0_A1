import {StyleSheet, Text, View, Button, Modal, props, TextInput,Font} from 'react-native'
import {useState, useEffect} from "react"
import * as SQLite from "expo-sqlite";
function CreateTransaction(props){
  const [dataLoading, setDataLoading] = useState(true);
  const [transaction, setTransaction] = useState([]);
  const [currCat, setCurrCat] = useState(undefined); // for text input box
  const [currMoney, setCurrMoney] = useState(undefined); // for text input box
  const [currDate, setCurrDate] = useState(undefined); // for text input box
  const [currNote, setCurrNote] = useState(undefined); // for text input box


  const db = SQLite.openDatabase("categories.db"); 

  useEffect(() => {
    db.transaction(tx => {
      let sqlcmd = "";
      sqlcmd += "CREATE TABLE IF NOT EXISTS transactions";
      sqlcmd += "  (id INTEGER PRIMARY KEY AUTOINCREMENT,";
      sqlcmd += "   cat TEXT),";
      sqlcmd += "   money INTEGER,";
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
      <View>
        <Text>Loading categories...</Text>
      </View>
    );
  }

  const addTransaction = () => {
    db.transaction(tx => {
      let sqlcmd = "";
      sqlcmd += "INSERT INTO transactions (cat, money, date, note) values (?,?,?,?)";
      tx.executeSql(sqlcmd, [currCat], [currMoney], [currDate], [currNote],
          (_, resultSet) => {
          let existingTransaction = [...transaction];
          existingTransaction.push({ id: resultSet.insertId, cat: currCat, money:currMoney, date: currDate, note: currNote });
          setTransaction(existingTransaction);
        })
    });
  }

  const showTransaction = () => {
    return transaction.map(({id,cat,money,date,note}) => {
      return (
        <View key={id} style={styles.row}> 
          <Text>{cat}</Text>
          <Text>{money}</Text>
          <Text>{date}</Text>
          <Text>{note}</Text>
        </View>
      );
    });
  };


    return(
        <Modal visible = {props.visibleT} animationType = "slide">
          <View style = {styles.appContainer}>
            <View style = {styles.buttons}>
              <View style={styles.backButton}>
                <Button
                  color = "red"
                  title = "cancel"
                  onPress={props.onCancelT}
                />
              </View>
              <View style = {styles.confirmButton}>
                <Button title = "Confirm Transaction" color= "green" style = {styles.addButton} width = "40%" onPress = {addTransaction}> </Button>
              </View>
            </View>
            
            <View style = {styles.appContainer}>
              <View style = {styles.box}>
                <Text style = {styles.textStyle}>
                  Input Category
                </Text>
                <TextInput 
                  style = {styles.textInput} 
                  placeholder ="ex. groceries" 
                  onChangeText={currCat}
                />
              </View>
                <View style = {styles.box}>
                <Text style = {styles.textStyle}>
                  Input Money Amount  
                </Text>
                <TextInput 
                  style = {styles.textInput} 
                  placeholder="ex. 100.49" 
                  onChangeText={currMoney}
                />
              </View>
              <View style = {styles.box}>
                <Text style = {styles.textStyle}>
                  Input Date
                </Text>
                <TextInput 
                  style = {styles.textInput} 
                  placeholder="ex. 03/06/2023" 
                  onChangeText={currDate}
                />
              </View>
              <View style = {styles.box}>
                <Text style = {styles.textStyle}>
                  Input Note
                </Text>
                <TextInput 
                  style = {styles.textInput} 
                  placeholder="ex. dinner party" 
                  onChangeText={currNote}
                />
              </View>  
              {showTransaction()}
            </View>
            </View>
        </Modal>
        
    )
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  backButton: {
    flex: 2,
  },
  buttons: {
    flexDirection: "row",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  backButton:{
    alignItems: 'flex-start',
    paddingTop: 35,
    paddingBottom: 10,
    paddingLeft: 15,
  },
  confirmButton:{
    alignItems: 'flex-start',
    paddingTop: 35,
    paddingBottom: 10,
    paddingLeft: 30,
  },
  textStyle:{
    fontSize: 14,
    fontFamily: "normal",
    color: "black",
  },
  box:{
    paddingBottom: 10,
  }
  
});
export default CreateTransaction;