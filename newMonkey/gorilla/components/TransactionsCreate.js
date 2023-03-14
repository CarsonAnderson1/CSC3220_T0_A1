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
  const [money, setMoney] = useState([])
  const [name, setName] = useState([])
  let totalMoney = 0;
  const db = SQLite.openDatabase("categories.db"); 
  const updateHandler = () => {
    {showMoney()}
    {updateCategory()}
  }
  useEffect(() => {
    db.transaction(tx => {
      let sqlcmd = "";
      sqlcmd += "CREATE TABLE IF NOT EXISTS transactions";
      sqlcmd += "  (id INTEGER PRIMARY KEY AUTOINCREMENT,";
      sqlcmd += "   cat TEXT,";
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
    db.transaction(tx => {
      let sqlcmd = "SELECT * FROM categories";
      tx.executeSql(sqlcmd, [],
        (_, resultSet) => {
          setName(resultSet.rows._array);  // results returned
        }
      );
    });
    setDataLoading(false);
     
  }, [name, setName], [money, setMoney]);
  
  if (dataLoading) {
    return (
      <View>
        <Text>Loading categories...</Text>
      </View>
    );
  }
  //const showMoney = () => {
  //  return name.map(({name,money}) => {
  //      if(name == currCat){
  //        totalMoney = money;
  //      }
  //      console.log("works");
  //  });
  //};
  
  const addTransaction = () => {
    if(currCat == null || currDate == undefined || currMoney == 0 || currNote == undefined){
      <Text color = "red"> Invalid Input</Text>
      console.log("invalid addition")
    }
    else{
    db.transaction(tx => {
      let sqlcmd = "";
      sqlcmd += "INSERT INTO transactions (cat, money, date, note) values (?,?,?,?)";
      
      tx.executeSql(sqlcmd, [currCat, currMoney, currDate, currNote],
          (_, resultSet) => {
          let existingTransaction = [...transaction];
          existingTransaction.push({ id: resultSet.insertId, cat: currCat, money:currMoney, date: currDate, note: currNote });
          setTransaction(existingTransaction);
        })
        tx.executeSql("SELECT * from transactions", [], (_, { rows }) =>
          console.log(JSON.stringify(rows)),
        );
    
    });
    
  }
  }

  const showTransaction = () => {
    return transaction.map(({id,cat,money,date,note}) => {
      return (
        <View key = {id} style={styles.column}> 
          <Text>{cat},{money}, {date}, {note}</Text>
          
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
                  title = "Close"
                  onPress={props.onCancelT}
                />
              </View>
              <View style = {styles.confirmButton}>
                <Button 
                title = "Confirm" 
                color= "green" 
                style = {styles.addButton} 
                width = "40%" 
                onPress = {addTransaction}
                />
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
                  onChangeText={setCurrCat}
                />
                <Text style = {styles.textStyle}>
                  Input Money Amount  
                </Text>
                <TextInput 
                  style = {styles.textInput} 
                  placeholder="ex. 100.49" 
                  onChangeText={setCurrMoney}
                />
                <Text style = {styles.textStyle}>
                  Input Date
                </Text>
                <TextInput 
                  style = {styles.textInput} 
                  placeholder="ex. 03/06/2023" 
                  onChangeText={setCurrDate}
                />
                <Text style = {styles.textStyle}>
                  Input Note
                </Text>
                <TextInput 
                  style = {styles.textInput} 
                  placeholder="ex. dinner party" 
                  onChangeText={setCurrNote}
                />
            </View>
            </View>
          </View>
        </Modal>
        
    )
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#1b1c1b',
  },
  backButton: {
    // flex: 2,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  textInput: {
    borderWidth: 2,
    borderColor: "black",
    width: "70%",
    padding: 8,
    backgroundColor: '#3a3d3a',
    color: 'white'
  },
  backButton:{
    alignItems: 'flex-start',
    paddingTop: 35,
    paddingBottom: 10,
    paddingLeft: 15,
  },
  confirmButton:{
    paddingTop: 35,
    paddingBottom: 10,
    paddingLeft: 100,
  },
  textStyle:{
    fontSize: 16,
    color: "white",
    paddingBottom: 10,
    paddingTop: 10
  },
  box:{
    paddingBottom: 10,
    flexDirection: 'column', 
    alignItems: 'center',
    padding: 8,
  }
  
});
export default CreateTransaction;