import React from 'react'
import { Checkbox, ButtonGroup, Button, Spacer } from '@nextui-org/react'

interface Todo {
  id: number;
  date: string;
  task: string;
  checked: boolean;
}

interface TaskProps {
  todo: Todo
  handleToggleTodo: (id: number, checked: boolean) => void
  handleDeleteTodo: (id: number) => void
}

const Task: React.FC<TaskProps> = (props) => {
  const { todo, handleToggleTodo, handleDeleteTodo } = props

  return (
    <>
      <li className='w-full flex justify-between'>
        <Checkbox
          isSelected={todo.checked}
          lineThrough
          onChange={(e) => handleToggleTodo(todo.id, e.target.checked)}
        >
          {todo.task}

        </Checkbox>
        <ButtonGroup isDisabled={todo.checked}>
          <Button
            color='default'
          // startContent={<img src="/EditIcon.svg" alt="Edit" className="w-6 h-6" />}
          >Edit
          </Button>
          <Button
            color='danger'
            // startContent={<img src="/TrashIcon.svg" alt="Delete" className="w-6 h-6" />}
            onClick={() => handleDeleteTodo(todo.id)}
          >
            Delete
          </Button>
        </ButtonGroup>
      </li>
      <Spacer y={1} />
    </>
  )
}

export default Task