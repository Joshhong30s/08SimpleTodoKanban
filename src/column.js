import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'

const Column = ({ column, tasks }) => {
  return (
    <Flex
      rounded='10px'
      bg='column-bg'
      w='400px'
      flexDir='column'
      mr={['0', '0', '2rem']}
      mb={['2rem', '2rem', '0']}
    >
      <Flex
        align='center'
        justify='center'
        h='60px'
        bg='column-header-bg'
        roundedTopLeft='10px'
        roundedTopRight='10px'
        px='1.5rem'
        mb='1.5rem'
      >
        <Text fontSize='18px' fontWeight={700} color='subtle-text'>
          {column.title}
        </Text>
      </Flex>

      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
          <Flex
            px='1.5rem'
            flex={1}
            flexDir='column'
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <Flex
                    key={task.id}
                    color='#D54A68'
                    mb='1rem'
                    h='72px'
                    bg='card-bg'
                    rounded='5px'
                    p='1.5rem'
                    outline='2px solid'
                    outlineColor={
                      draggableSnapshot.isDragging
                        ? 'card-border'
                        : 'transparent'
                    }
                    boxShadow={
                      draggableSnapshot.isDragging
                        ? '0 5px 10px rgba(0, 0, 0, 0.6)'
                        : 'unset'
                    }
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <Text>{task.content}</Text>
                  </Flex>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </Flex>
        )}
      </Droppable>
    </Flex>
  )
}

export default Column
