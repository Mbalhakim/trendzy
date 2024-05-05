import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const ListTable = ({ listOfData, dataHead }) => {
  const tableHead = dataHead;
  const tableData = listOfData.map(user => [user.accountId, user.username, user.email, user.Role]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <DataTable style={styles.table}>
            <DataTable.Header style={styles.tableHeader}>
              {tableHead.map((head, index) => (
                <DataTable.Title key={index} style={styles.headerItem}>{head}</DataTable.Title>
              ))}
            </DataTable.Header>
            {tableData.map((rowData, index) => (
              <DataTable.Row key={index} style={[styles.tableRow, index % 2 === 0 && styles.tableRowOdd]}>
                {rowData.map((data, index) => (
                  <DataTable.Cell key={index} style={styles.tableData}>{data}</DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  tableHeader: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#000000',
    paddingVertical: 12,
  },
  tableRow: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 12,
  },
  tableRowOdd: {
    backgroundColor: '#EEEEEE',
  },
  tableData: {
    flex: 1,
    textAlign: 'center',
  },
  headerItem: {
    flex: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
});

export default ListTable;
