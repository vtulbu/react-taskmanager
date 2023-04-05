import { FC, useEffect, useState } from 'react';

import { AddTask, useBoards } from 'src/providers/board/BoardProvider';
import { useDialog } from 'src/providers/dialog/DialogProvider';
import { Button } from '../Button';
import { Dropdown } from '../Dropdown';
import { CloseSvg } from '../SVGs/CloseSvg';
import { TextField } from '../TextField';
import { TextFieldArea } from '../TextFieldArea';
import { EDIT } from 'src/constants';

import s from './AddEditTask.module.css';
import { useRouterQueryListener } from 'src/hooks';

export const AddEditTask: FC = () => {
  const { taskAction, columnId, taskId } = useRouterQueryListener();
  const isEditing = taskAction === EDIT;
  const [, { closeDialog }] = useDialog();

  const [{ currentBoard }, { handleAddTask, handleEditTask }] = useBoards();

  const [taskForm, setTaskForm] = useState<Omit<AddTask, 'boardId'>>({
    label: '',
    description: '',
    subTasks: [],
    columnId: currentBoard?.columns[0].id || '',
  });

  const statusOptions = currentBoard?.columns.map((column) => ({
    label: column.label,
    value: column.id,
  }));

  useEffect(() => {
    if (isEditing) {
      const column = currentBoard?.columns.find(
        (column) => column.id === columnId
      );
      const task = column?.task.find((task) => task.id === taskId);
      setTaskForm({
        label: task?.label || '',
        description: task?.description || '',
        subTasks: task?.subTasks || [],
        columnId: columnId || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  return (
    <div className={s.taskFormContainer}>
      <TextField
        onChange={(e) => {
          setTaskForm((prevValue) => {
            return { ...prevValue, label: e.target.value };
          });
        }}
        value={taskForm.label}
        label='Title'
        placeholder='e.g. Take coffee break'
      />
      <TextFieldArea
        onChange={(e) => {
          setTaskForm((prevValue) => {
            return { ...prevValue, description: e.target.value };
          });
        }}
        value={taskForm.description}
        autoResize
        label='Description'
        placeholder='e.g. It’s always good to take a break. This 15 minute break will 
                    recharge the batteries a little.'
      />
      <div className={s.subTasksContainer}>
        {taskForm.subTasks.map((subTask, idx) => {
          return (
            <div className={s.dissmissableTextField} key={`${idx}_subtask`}>
              <TextField
                {...(idx === 0 && {
                  label: 'Subtasks',
                })}
                value={taskForm.subTasks[idx].label}
                onChange={(e) => {
                  setTaskForm((prevValue) => {
                    const values = { ...prevValue };
                    values.subTasks[idx].label = e.target.value;
                    return values;
                  });
                }}
              />
              <Button
                icon={<CloseSvg />}
                onClick={() => {
                  setTaskForm((prevValue) => {
                    return {
                      ...prevValue,
                      subTasks: prevValue.subTasks.filter(
                        (_subTask, index) => index !== idx
                      ),
                    };
                  });
                }}
                style={{
                  ...(idx === 0 && { marginTop: '24px' }),
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  height: 'fit-content',
                  border: 'none',
                }}
              />
            </div>
          );
        })}

        <Button
          label='+ Add New Subtask'
          color='secondary'
          onClick={() => {
            setTaskForm((prevValue) => {
              return {
                ...prevValue,
                subTasks: [...prevValue.subTasks, { label: '' }],
              };
            });
          }}
        />
      </div>
      <Dropdown
        label='Status'
        value={taskForm.columnId}
        options={statusOptions}
        onChange={(e) => {
          setTaskForm((prevValue) => {
            return { ...prevValue, columnId: e.target.value };
          });
        }}
      />
      <Button
        label={isEditing ? 'Save Changes' : 'Create Task'}
        disabled={!taskForm.label}
        onClick={() => {
          closeDialog();
          isEditing
            ? handleEditTask({
                ...taskForm,
                boardId: currentBoard?.id || '',
                id: taskId || '',
              })
            : handleAddTask({ ...taskForm, boardId: currentBoard?.id || '' });
        }}
      />
    </div>
  );
};
