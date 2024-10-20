import React from 'react'
import { Checkbox, ButtonGroup, Button, Spacer, Input } from '@nextui-org/react'

interface Todo {
  id: number;
  date: string;
  task: string;
  checked: boolean;
}

interface TaskProps {
  todo: Todo;
  handleToggleTodo: (id: number, checked: boolean) => void;
  handleDeleteTodo: (id: number) => void;
  handleEditTodo: (id: number, task: string) => void;
}

const Task: React.FC<TaskProps> = (props) => {
  const { todo, handleToggleTodo, handleDeleteTodo, handleEditTodo } = props;

  const [editingTodo, setEditingTodo] = React.useState(false);
  const [changedContent, setChangedContent] = React.useState(todo.task);

  const editTodo = (id: number) => {
    setEditingTodo(!editingTodo);

    if (editingTodo && changedContent !== todo.task) {
      handleEditTodo(id, changedContent);
    }
  }

  return (
    <>
      <li className='w-full flex justify-between'>
        <Checkbox
          isDisabled={editingTodo}
          isSelected={todo.checked}
          lineThrough
          onChange={(e) => handleToggleTodo(todo.id, e.target.checked)}
        >
          {editingTodo ? '' : <span>{todo.task}</span>}
        </Checkbox>
        {editingTodo ? <div className='flex flex-col justify-center items-center w-full h-full pt-2'>
          <Input
            value={changedContent}
            onValueChange={setChangedContent}
          />
        </div> : ''}

        <ButtonGroup isDisabled={todo.checked} className='p-2'>
          <Button
            color='default'
            // startContent={<img src="/EditIcon.svg" alt="Edit" className="w-6 h-6" />}
            onClick={() => editTodo(todo.id)}
            isDisabled={editingTodo == true && changedContent.trim().length === 0}
          >
            {editingTodo ? 'Save' : 'Edit'}
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