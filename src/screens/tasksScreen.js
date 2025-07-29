import React, { useState, useCallback } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import TaskCard from "../components/cards/taskCard";
import { getDBConnection, createTable, getAllTasks } from "../database/db";
import { FAB } from 'react-native-paper';
import * as colors from '../utilities/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TasksScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const db = await getDBConnection();
    await createTable(db);
    const storedTasks = await getAllTasks(db);
    setTasks(storedTasks);
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  return (
    <View style={{ flex: 1}}>
      {
        tasks.length === 0 ?
        <View style={styles.emptyContainer}>
          <Icon name="clipboard-text-outline" size={60} color={colors.gray} />
          <Text style={styles.emptyTitle}>No tasks yet</Text>
          <Text style={styles.emptySubtitle}>Tap the + button to add your first task!</Text>
        </View>
        :
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TaskCard item={item} navigation={navigation} reloadTasks={loadTasks} />}
          contentContainerStyle={{ paddingBottom: 80 }} 
        />
      }

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('Add Task')}
        label={"Add-Task"}
        color={colors.primaryLight}
      />

    </View>
  );
};

export default TasksScreen;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: colors.buttonColor,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.gray,
    marginTop: 15,
  },

  emptySubtitle: {
    fontSize: 16,
    color: colors.gray,
    marginTop: 5,
  },
})