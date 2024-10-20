import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';

interface AddNewTaskProps {
  handleAddTodo: (taskContent: string) => void;
}

const AddNewTask: React.FC<AddNewTaskProps> = (prop) => {
  const [TaskContent, setTaskContent] = useState<string>('');

  const { handleAddTodo } = prop;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddTodo(TaskContent);
    setTaskContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <Input
        isClearable
        labelPlacement='outside'
        label="Add a task"
        placeholder='Title'
        value={TaskContent}
        onValueChange={setTaskContent}
        onClear={() => setTaskContent('')}
        className="mr-2"
      />
      <div className='h-full flex flex-col justify-end'>
        <Button type="submit" color='primary' isDisabled={TaskContent.trim().length > 0 ? false : true}>Add Todo</Button>
      </div>
    </form>
  );
};

export default AddNewTask;
