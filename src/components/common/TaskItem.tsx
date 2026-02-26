import React from 'react'
import { Task } from '../../types'
import { View, Text, Switch, Image, TouchableOpacity } from 'react-native'

interface Props {
  task: Task
  onToggle: (id: number) => void
  onAttachPhoto?: (id: number) => void
}

export const TaskItem: React.FC<Props> = ({ task, onToggle, onAttachPhoto }) => {
  return (
    <View style={{ backgroundColor: '#fff', marginBottom: 8, marginHorizontal: 16, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
      <View style={{ flexDirection: 'row', padding: 12, alignItems: 'center' }}>
        {task.attachmentUri ? (
          <TouchableOpacity onPress={() => onAttachPhoto?.(task?.id)}>
            <Image
              source={{ uri: task?.attachmentUri }}
              style={{ width: 60, height: 60, borderRadius: 8, marginRight: 12 }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onAttachPhoto?.(task?.id)}
            style={{ width: 60, height: 60, borderRadius: 8, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', marginRight: 12, borderWidth: 1, borderColor: '#E0E0E0', borderStyle: 'dashed' }}
          >
            <Text style={{ fontSize: 10, color: '#999', marginTop: 2 }}>
              Foto
            </Text>
          </TouchableOpacity>
        )}
        <View style={{ flex: 1, marginRight: 12 }}>
          <Text
            numberOfLines={2}
            style={{ fontSize: 16, color: task?.completed ? '#8E8E93' : '#000', fontWeight: '500', lineHeight: 22, textDecorationLine: task?.completed ? 'line-through' : 'none' }}
          >
            {task?.todo}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, marginRight: 6, backgroundColor: task.completed ? '#34C759' : '#FF9500' }} />
            <Text style={{ fontSize: 13, color: '#8E8E93' }}>
              {task?.completed ? 'Completada' : 'Pendiente'}
            </Text>
          </View>
        </View>
        <Switch
          value={task?.completed}
          ios_backgroundColor='#D1D1D6'
          onValueChange={() => onToggle(task?.id)}
          thumbColor={task?.completed ? '#fff' : '#fff'}
          trackColor={{ false: '#D1D1D6', true: '#34C759' }}
        />
      </View>
    </View>
  )
}