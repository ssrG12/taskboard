import React from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Text, TouchableOpacity } from 'react-native';
import { TaskItem } from '../components/common/TaskItem';
import { AvatarView } from '../components/native/AvatarView';
import { useDashboard } from '../hooks/useDashboard';

export const DashboardScreen = () => {
  const {
    tasks,
    currentFilter,
    isLoading,
    handleRefresh,
    handleToggleTask,
    handleFilterChange,
    handleAttachPhoto,  // ⬅️ NUEVO
    filterOptions,
  } = useDashboard();

  return (
    <View style={styles.container}>
      {/* Header con Avatar */}
      <View style={styles.header}>
        <AvatarView name="Santiago Lopez" style={styles.avatar} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Mis Tareas</Text>
          <Text style={styles.headerSubtext}>{tasks.length} tareas</Text>
        </View>
      </View>

      {/* Filtros */}
      <View style={styles.filterContainer}>
        {filterOptions.map(({ value, label }) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.filterButton,
              currentFilter === value && styles.filterButtonActive,
            ]}
            onPress={() => handleFilterChange(value)}>
            <Text
              style={[
                styles.filterText,
                currentFilter === value && styles.filterTextActive,
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de tareas */}
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={handleToggleTask}
            onAttachPhoto={handleAttachPhoto}  // ⬅️ NUEVO
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        contentContainerStyle={tasks.length === 0 && styles.emptyContainer}
        ListEmptyComponent={
          !isLoading ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No hay tareas</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  headerSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});