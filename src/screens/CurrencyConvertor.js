import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { openDatabase } from 'react-native-sqlite-storage';

let db = openDatabase({
    name: 'ConverionHistory',
    location: 'default'
});
const CurrencyConvertor = (props) => {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [convertedAmount1, setConvertedAmount1] = useState('');
    const [convertedAmount2, setConvertedAmount2] = useState('');
    const [convertedAmount3, setConvertedAmount3] = useState('');
    const [convertedAmount4, setConvertedAmount4] = useState('');
    const [convertedAmount5, setConvertedAmount5] = useState('');
    const [exchangeRates, setExchangeRates] = useState({});
    const [currencies, setCurrencies] = useState(['USD', 'EUR', 'INR', 'GBP', 'AUD', 'CAD']);



    useEffect(() => {
        // Fetch exchange rates from an API (e.g., ExchangeRate-API)
        axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
            .then(response => {
                setExchangeRates(response.data.rates);
            })
            .catch(error => {
                console.error('Error fetching exchange rates:', error);
            });
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS History (id INTEGER PRIMARY KEY AUTOINCREMENT, amount TEXT NOT NULL, fromCurrency TEXT NOT NULL, toCurrency TEXT NOT NULL,convertedAmount TEXT NOT NULL)',
                [],
                (tx, results) => {
                    console.log('Table created successfully');
                },
                error => {
                    console.log('Error creating table: ', error);
                }
            );
        });
    }, []);

    const updatedCurrenciesList = currencies.filter(currency => currency !== fromCurrency);
    const convertCurrency = () => {
        if (amount === '') {
            alert('Please enter an amount');
            return;
        }

        const rate1 = exchangeRates[updatedCurrenciesList[0]] / exchangeRates[fromCurrency];
        const result1 = parseFloat(amount) * rate1;
        setConvertedAmount1(result1.toFixed(2));
        insertData(updatedCurrenciesList[0], result1.toFixed(2));

        const rate2 = exchangeRates[updatedCurrenciesList[1]] / exchangeRates[fromCurrency];
        const result2 = parseFloat(amount) * rate2;
        setConvertedAmount2(result2.toFixed(2));
        insertData(updatedCurrenciesList[1], result2.toFixed(2));

        const rate3 = exchangeRates[updatedCurrenciesList[2]] / exchangeRates[fromCurrency];
        const result3 = parseFloat(amount) * rate3;
        setConvertedAmount3(result3.toFixed(2));
        insertData(updatedCurrenciesList[2], result3.toFixed(2));

        const rate4 = exchangeRates[updatedCurrenciesList[3]] / exchangeRates[fromCurrency];
        const result4 = parseFloat(amount) * rate4;
        setConvertedAmount4(result4.toFixed(2));
        insertData(updatedCurrenciesList[3], result4.toFixed(2));

        const rate5 = exchangeRates[updatedCurrenciesList[4]] / exchangeRates[fromCurrency];
        const result5 = parseFloat(amount) * rate5;
        setConvertedAmount5(result5.toFixed(2));
        insertData(updatedCurrenciesList[4], result5.toFixed(2));


    };
    const insertData = (toCurrency, convertedAmount) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO History (amount, fromCurrency, toCurrency, convertedAmount) VALUES (?,?,?,?)',
                [amount, fromCurrency, toCurrency, convertedAmount],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        console.log('Data added successfully');
                    } else {
                        console.log('Failed to Data');
                    }
                },
                error => {
                    console.log('Error adding data: ', error);
                }
            );
        });
    };
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Convert Currency</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <TextInput
                style={styles.input}
                placeholder="From currency (e.g., USD)"
                value={fromCurrency}
                onChangeText={setFromCurrency}
            />
            <TouchableOpacity style={styles.button}
                onPress={convertCurrency}>
                <Text style={styles.buttonText}>Convert</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('History')}>
                <Text style={styles.buttonText}>History</Text>
            </TouchableOpacity>
            {convertedAmount1 && (
                <Text style={styles.itemContainer}>
                    {amount} {fromCurrency} = {convertedAmount1} {updatedCurrenciesList[0]}
                </Text>
            )}
            {convertedAmount2 && (
                <Text style={styles.itemContainer}>
                    {amount} {fromCurrency} = {convertedAmount2} {updatedCurrenciesList[1]}
                </Text>
            )}
            {convertedAmount3 && (
                <Text style={styles.itemContainer}>
                    {amount} {fromCurrency} = {convertedAmount3} {updatedCurrenciesList[2]}
                </Text>
            )}
            {convertedAmount4 && (
                <Text style={styles.itemContainer}>
                    {amount} {fromCurrency} = {convertedAmount4} {updatedCurrenciesList[3]}
                </Text>
            )}
            {convertedAmount5 && (
                <Text style={styles.itemContainer}>
                    {amount} {fromCurrency} = {convertedAmount5} {updatedCurrenciesList[4]}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: '#000',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    result: {
        marginTop: 20,
        fontSize: 18,
    },
    list: {
        marginTop: 20,
        width: '100%',
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    button: {               // Width of 20dp
        backgroundColor: 'green',    // Green background color
        paddingVertical: 10,         // Vertical padding for better touch area
        marginBottom: 20,            // Margin at the bottom
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,             // Slight border radius
    },
    buttonText: {
        color: '#fff',               // White text color
        fontSize: 16,
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 12,
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
      }
});

export default CurrencyConvertor;
