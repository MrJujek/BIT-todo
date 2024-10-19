import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';

const AddNewTask: React.FC = () => {
  const [TaskContent, setTaskContent] = useState<string>('');

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTaskContent('');
  }

  return (
    <form onSubmit={handleAddTodo} className="flex items-center">
      <Input
        isClearable
        labelPlacement='outside'
        label="Add a task"
        placeholder='Title'
        value={TaskContent}
        onValueChange={setTaskContent}
        onClear={() => setTaskContent('')}
        className="mr-2" />
      <div className='h-full flex flex-col justify-end'>
        <Button type="submit" color='primary'>Add Todo</Button>

      </div>
    </form>
  );
};

export default AddNewTask;
