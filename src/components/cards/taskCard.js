import { useState } from "react";
import { View, Text, StyleSheet } from "react-native"
import DeleteModal from "../modals/deleteModal";
import { getDBConnection, deleteTask } from '../../database/db';
import * as colors from '../../utilities/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Separator from "../separator";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

const TaskCard = ({ item, navigation, reloadTasks }) => {
  const [showDelModal, setShowDelModal] = useState(false);

  const handleDelete = async () => {
    const db = await getDBConnection();
    await deleteTask(db, item.id);
    reloadTasks();
  };

  return (
    <View style={{ margin: 10, borderRadius: 30, padding: 20, backgroundColor: colors.primaryDark, elevation: 10 }}>
      <DeleteModal
        showDelModal={showDelModal}
        setShowDelModal={setShowDelModal}
        onConfirmDelete={handleDelete}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 20, color: colors.SecondaryDark, fontWeight: 'bold', }}>{item.title}</Text>

        <Menu>
          <MenuTrigger>
            <Icon name="dots-vertical" size={30} color={colors.SecondaryDark} />
          </MenuTrigger>

          <MenuOptions customStyles={styles.menuOptions}>
            <MenuOption onSelect={() => navigation.navigate("Edit Task", { task: item })}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.menuText}>Edit</Text>
                <Icon name="pencil" size={20} color={colors.SecondaryDark} style={styles.menuIcon} />
              </View>
            </MenuOption>

            <Separator />

            <MenuOption onSelect={() => setShowDelModal(true)}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.menuText, { color: colors.danger }]}>Delete</Text>
                <Icon name="delete" size={20} color={colors.danger} style={styles.menuIcon} />
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>

      <Separator color={colors.green} />

      <Text style={{ fontSize: 16, marginBottom: 30 }}>{item.description}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 14, fontWeight:'bold' }}>{item.date}</Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            padding: 6,
            borderRadius: 10,
            color: 'white',
            backgroundColor:
              item.priority === 'High' ? colors.danger :
                item.priority === 'Medium' ? colors.olive :
                  item.priority === 'Low' ? colors.green : colors.gray,
          }}
        >
          Priority: {item.priority}
        </Text>
      </View>

    </View>
  )
}

export default TaskCard;

const styles = StyleSheet.create({
  menuOptions: {
    optionsWrapper: {
      backgroundColor: colors.primaryLight,
      padding: 8,
      borderRadius: 10,
      elevation: 5,
      position: 'absolute',
      top: 30,
      right: 10
    },
  },

  menuText: {
    color: colors.SecondaryDark,
    fontSize: 16,
  },

  menuIcon: {
    marginLeft: 8,
  },
})