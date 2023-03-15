import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Button,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { v4 as uuid } from 'uuid'

const Column = dynamic(() => import('../src/Column'), { ssr: false })

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTaskIds = Array.from(sourceCol.taskIds)
  const [removed] = newTaskIds.splice(startIndex, 1)
  newTaskIds.splice(endIndex, 0, removed)

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  }

  return newColumn
}

export default function Home() {
  const [state, setState] = useState(initialData)
  const [newTaskText, setNewTaskText] = useState('')

  // Load saved state from local storage
  useEffect(() => {
    const savedState = localStorage.getItem('todo-app-state')
    console.log('Saved state:', savedState)
    if (savedState) {
      setState(JSON.parse(savedState))
    }
  }, [])

  // Save state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('todo-app-state', JSON.stringify(state))
  }, [state])

  const onDragEnd = (result) => {
    const { destination, source } = result

    // If users tries to drop in an unknown destination
    if (!destination) return

    // If the user drags and drops back in the same position
    if (
      !destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // If the user drops within the same column but in a different position
    const sourceCol = state.columns[source.droppableId]
    const destinationCol = state.columns[destination.droppableId]

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      )

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      }
      setState(newState)
      return
    }

    // If the user moves from one column to another
    const startTaskIds = Array.from(sourceCol.taskIds)
    const [removed] = startTaskIds.splice(source.index, 1)
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    }

    const endTaskIds = Array.from(destinationCol.taskIds)
    endTaskIds.splice(destination.index, 0, removed)
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    }

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    }
    setState(newState)
  }

  const handleInputChange = (event) => {
    setNewTaskText(event.target.value)
  }

  const handleAddNewTask = () => {
    if (!newTaskText) return

    const newTaskId = uuid()
    const newTask = { id: newTaskId, content: newTaskText }

    const newState = {
      ...state,
      tasks: {
        ...state.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...state.columns,
        'column-1': {
          ...state.columns['column-1'],
          taskIds: [...state.columns['column-1'].taskIds, newTaskId],
        },
      },
    }

    setState(newState)
    setNewTaskText('')
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex
        flexDir='column'
        bg='main-bg'
        minH='100vh'
        w='full'
        color='black-text'
        pb={['2rem', '4rem']}
      >
        <Flex pb='4rem' flexDir='column' align='center'>
          <Heading pt='2rem' fontSize={['2xl', '40px']} fontWeight={600}>
            小寶出生 To-Do List
            <hr
              style={{
                width: '100%',
                height: '2px',
                margin: '10px 0',
                background: '#FFFFFF',
                borderRadius: '10px',
              }}
            />
          </Heading>
          <Flex
            mt={['1rem', '3rem']}
            fontSize={['12px', '20px']}
            color='subtle-text'
            align='center'
          >
            <Input
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              mr='2rem'
              fontWeight={400}
              placeholder='..新增事項'
              _placeholder={{ color: '#FFFFFF' }}
              border='2px solid'
              borderColor='#FDCED8'
              focusBorderColor='#FFFFFF'
            />
            <Button
              bg='#FDCED8'
              focusBorderColor='#FFFFFF'
              onClick={handleAddNewTask}
              color='#D54A68'
            >
              Add
            </Button>
          </Flex>
        </Flex>
        <Flex
          justify='space-between'
          px={['1rem', '2rem', '4rem']}
          flexWrap={['wrap', 'wrap', 'nowrap']}
        >
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId]
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId])

            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                width={['100%', '100%', '100%']}
                mr={['0', '0', '4rem']}
                mb={['4rem', '4rem', '2rem']}
              />
            )
          })}
        </Flex>
      </Flex>
    </DragDropContext>
  )
}

const initialData = {
  tasks: {
    1: { id: 1, content: '報戶口' },
    2: { id: 2, content: '組裝嬰兒床' },
    3: { id: 3, content: '買嬰兒攝影機' },
    4: { id: 4, content: '買紙尿褲' },
    5: { id: 5, content: '奶瓶消毒鍋' },
    6: { id: 6, content: '組裝汽座' },
  },

  columns: {
    'column-1': {
      id: 'column-1',
      title: 'TO-DO',
      taskIds: [1, 2, 3, 4, 5, 6],
    },
    'column-2': {
      id: 'column-2',
      title: 'IN-PROGROSS',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'FINISHED',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
}
