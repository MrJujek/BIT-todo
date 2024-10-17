import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';

const AddNewTask: React.FC = () => {
  const [TaskContent, setTaskContent] = useState<string>('');

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTaskContent('');
  }

  return (
    <div>
      <form onSubmit={(e) => handleAddTodo(e)} className="flex items-center">
        <Input isClearable label="Add a task" placeholder='Title' value={TaskContent} onChange={(e) => setTaskContent(e.target.value)}
          onClear={() => setTaskContent('')}
          className="mr-2" />
        <Button type="submit" color='primary'>Add Todo</Button>
      </form>


    </div>
  );
};

export default AddNewTask;
