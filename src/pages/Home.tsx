import React, { useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle === '') return;

    const date = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks(oldState => [...oldState, date])

  }

  function handleMarkTaskAsDone(id: number) {

    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done
        };
      } else {
        return task;
      }
    })

    setTasks(newTasks);
  }


  function handleRemoveTask(id: number) {
    setTasks(oldState => oldState.filter(
      Task => Task.id !== id
    ))
  }


  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList
        tasks={tasks}
        onPress={handleMarkTaskAsDone}
        onLongPress={handleRemoveTask}
      />
    </>
  )
}