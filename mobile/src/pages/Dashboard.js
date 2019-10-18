import React, { useEffect, useState } from 'react';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { SafeAreaView, View, Alert, TouchableOpacity, Text, StyleSheet } from 'react-native';


import api from '../services/api';

export default function Dashboard({ navigation }) {
  const [head, setHead] = useState(['ID', 'First', 'Last', 'Actions']);
  const [users, setUsers] = useState([]);
  const tableData = [];

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/users');
      setUsers(response.data);
    }

    loadUsers();
  }, [tableData]);



  users.forEach(element => {
    const rowData = [];
    rowData.push(element.id, element.first, element.last, '');
    tableData.push(rowData);
});


async function handleDelete(index) {
  const user = tableData[index];
  const response = await api.delete(`/user/${user[0]}`);
  if (response.status == 204) {
      Alert.alert("User deleted successfully");
      tableData.splice(index, 1);  
      setHead(['ID', 'First', 'Last', 'Actions']);
  } else {
      Alert.alert(response.Infor);
  }
}

async function handleUpdate(index) {
  navigation.navigate('Change', { user: tableData[index] });
}


const element = (index) => (
  <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => handleUpdate(index)}>
          <View style={styles.buttonEdit}>
              <Text style={styles.buttonText}>Edit</Text>
          </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(index)}>
          <View style={styles.buttonDel}>
              <Text style={styles.buttonText}>Del</Text>
          </View>
      </TouchableOpacity>
  </View>
);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={()=>{ navigation.navigate('Register')}}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.containerTable}>
            <Table borderStyle={{ borderColor: 'transparent' }}>
                <Row data={head} style={styles.head} textStyle={styles.rowText} />
                {
                    tableData.length == 0? <Text style={styles.empty}>No users to list</Text> :
                    (
                        tableData.map((rowData, index) => (
                        <TableWrapper key={index} style={styles.row}>
                            {
                                rowData.map((cellData, cellIndex) => (
                                    <Cell key={cellIndex} data={cellIndex === 3 ? element(index) : cellData} textStyle={styles.text} />
                                ))
                            }
                        </TableWrapper>
                    )))
                }
            </Table>
        </View>

    </SafeAreaView>

  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  
  button: {
    height: 40,
    width: 40,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop:20,
    borderRadius: 100,
    marginStart:280
    
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,

  },
  containerTable:{
    flex: 1,
    padding: 10,
    paddingTop: 40,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    flexDirection: 'row'
},
buttonEdit: {
    width: 30,
    height: 20,
    backgroundColor: '#FFC300',
    borderRadius: 2,
    marginHorizontal: 5
},
buttonDel: {
    width: 30,
    height: 20,
    backgroundColor: '#DB3A17',
    borderRadius: 2,
    marginHorizontal: 5
},
buttonText: {
    textAlign: 'center',
    color: '#f5f5f5',
},
head: {
    height: 40, backgroundColor: '#f05a5b'
},
rowText: {
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 8,
    color: '#FFF',
},
row: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5'
},
text: {
    textAlign: 'center',
    margin: 8,
    backgroundColor: '#f05a5b'
},
empty:{
    alignSelf: 'center',
    justifyContent: 'center', 
    marginTop:80,
    fontSize: 30,
    color:'#f05a5b',
    fontWeight: 'bold',
}
});