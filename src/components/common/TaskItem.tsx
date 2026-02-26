import React from 'react';
import { View, Text, Switch, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Task } from '../../types';

interface Props {
  task: Task;
  onToggle: (id: number) => void;
  onAttachPhoto?: (id: number) => void;  // ⬅️ NUEVO
}

export const TaskItem: React.FC<Props> = ({ task, onToggle, onAttachPhoto }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Foto adjunta o placeholder */}
        {task.attachmentUri ? (
          <TouchableOpacity onPress={() => onAttachPhoto?.(task.id)}>
            <Image
              source={{ uri: task.attachmentUri }}
              style={styles.thumbnail}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.photoPlaceholder}
            onPress={() => onAttachPhoto?.(task.id)}>
            <Text style={styles.photoPlaceholderText}>📷</Text>
            <Text style={styles.photoPlaceholderSubtext}>Foto</Text>
          </TouchableOpacity>
        )}

        {/* Texto de la tarea */}
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              task.completed && styles.completed
            ]}
            numberOfLines={2}>
            {task.todo}
          </Text>
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusDot,
              task.completed ? styles.statusDotCompleted : styles.statusDotPending
            ]} />
            <Text style={styles.statusText}>
              {task.completed ? 'Completada' : 'Pendiente'}
            </Text>
          </View>
        </View>

        {/* Switch */}
        <Switch
          value={task.completed}
          onValueChange={() => onToggle(task.id)}
          trackColor={{ false: '#D1D1D6', true: '#34C759' }}
          thumbColor={task.completed ? '#fff' : '#fff'}
          ios_backgroundColor="#D1D1D6"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  photoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  photoPlaceholderText: {
    fontSize: 24,
  },
  photoPlaceholderSubtext: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    lineHeight: 22,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusDotCompleted: {
    backgroundColor: '#34C759',
  },
  statusDotPending: {
    backgroundColor: '#FF9500',
  },
  statusText: {
    fontSize: 13,
    color: '#8E8E93',
  },
});