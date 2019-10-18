import React, {useState} from 'react';
import { View, Text, Alert ,TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function Change({ navigation}) {
    const  user =  navigation.getParam('user');    
    const [first, setFirst] = useState(user[1]);
    const [last, setLast] = useState(user[2]);
    const [error, setError]=useState('');
    const id  = user[0];


    async function handleUpdate() { 

        if(first && last){
            const response  = await api.put(`/user/${id}`, {
                first, last
            });
            if(response.status == 200)
                navigation.navigate('Dashboard');                 
            else{
                Alert.alert(`User with id ${id} does not exist`);
            }
        }else{
            setError('fill in all fields');
        }
        
    }
    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
            <Text style={styles.title}>Change User</Text>
            <View style={styles.form}>
                <Text style={styles.label}>FIRST *</Text>
                <TextInput style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="First"
                    placeholderTextColor="#999"
                    value={first}
                    onChangeText={setFirst}                    
                />

                <Text style={styles.label}>LAST *</Text>
                <TextInput style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="First"
                    placeholderTextColor="#999"
                    value={last}
                    onChangeText={setLast}
                />
                <Text style={styles.error}>{error}</Text>
                <TouchableOpacity onPress={handleUpdate} style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,        
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 20,
        marginTop: 40,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    title:{
        marginTop: 10,
        fontSize: 36
    },
    error:{
        paddingHorizontal: 50,
        marginBottom:10,
        alignItems: 'center',
        color: '#f05a5b',
    }
});