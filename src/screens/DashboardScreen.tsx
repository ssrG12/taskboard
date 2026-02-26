import React from 'react'
import { useDashboard } from '../hooks/useDashboard'
import { TaskItem } from '../components/common/TaskItem'
import { AvatarView } from '../components/native/AvatarView'
import { View, FlatList, RefreshControl, Text, TouchableOpacity } from 'react-native'

export const DashboardScreen = () => {
  const {
    tasks,
    isLoading,
    currentFilter,
    handleRefresh,
    filterOptions,
    handleToggleTask,
    handleAttachPhoto,
    handleFilterChange,
  } = useDashboard()

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}>
        <AvatarView name='Santiago Lopez' style={{ width: 50, height: 50, marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
            Mis Tareas
          </Text>
          <Text style={{ fontSize: 14, color: '#666', marginTop: 2 }}>
            {tasks?.length} tareas
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}>
        {filterOptions?.map(({ value, label }) => (
          <TouchableOpacity
            key={value}
            onPress={() => handleFilterChange(value)}
            style={{ flex: 1, padding: 12, alignItems: 'center', marginHorizontal: 4, borderRadius: 8, backgroundColor: currentFilter === value ? '#007AFF' : '#f0f0f0' }}
          >
            <Text style={{ fontSize: 14, color: currentFilter === value ? '#fff' : '#333', fontWeight: currentFilter === value ? 'bold' : 'normal' }}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={tasks}
        keyExtractor={item => item?.id?.toString()}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={handleToggleTask} onAttachPhoto={handleAttachPhoto} />
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        contentContainerStyle={tasks?.length === 0 ? { flexGrow: 1, justifyContent: 'center', alignItems: 'center' } : undefined}
        ListEmptyComponent={
          !isLoading ? (
            <View style={{ padding: 20 }}>
              <Text style={{ fontSize: 16, color: '#999' }}>
                No hay tareas
              </Text>
            </View>
          ) : null
        }
      />
    </View >
  )
}