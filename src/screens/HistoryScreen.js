import { View, Text, FlatList,StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react';
import { openDatabase } from 'react-native-sqlite-storage';

let db = openDatabase({
  name: 'ConverionHistory',
  location: 'default'
});
const HistoryScreen = (props) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM History',
        [],
        (tx, results) => {
          let historyList = [];
          for (let i = 0; i < results.rows.length; i++) {
            historyList.push(results.rows.item(i));
          }
          setHistory(historyList);
          console.log('Users fetched successfully');
        },
        error => {
          console.log('Error fetching users: ', error);
        }
      );
    });
  };
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.amount} {item.fromCurrency} == {item.convertedAmount} {item.toCurrency}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Currency History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 16,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor:'lightgreen'
  },
  itemTitle: {
    fontSize: 18,
    color: '#333',
  }
});

export default HistoryScreen