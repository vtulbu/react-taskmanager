import { Checkbox } from 'primereact/checkbox';
import { FC } from 'react';
import { useBoards } from 'src/providers/board/BoardProvider';
import { useRouterQueryListener } from 'src/providers/hooks';
import { DotMenu } from '../DotMenu';
import { TASK } from 'src/constants';
import { Dropdown } from '../Dropdown';

import './styled.css';

export const ViewTask: FC = () => {
  const [{ currentBoard }, { handleChangeTaskStatus, handleCheckSubtask }] =
    useBoards();
  const { columnId, taskId } = useRouterQueryListener();

  const selectedColumn = currentBoard?.columns.find((c) => c.id === columnId);
  const selectedTask = selectedColumn?.task.find((t) => t.id === taskId);

  const numCompleteSubtasks = selectedTask?.subTasks.filter(
    (s) => s.isDone
  ).length;
  const numOfSubtasks = selectedTask?.subTasks.length;

  const statusOptions = currentBoard?.columns.map((column) => ({
    label: column.label,
    value: column.id,
  }));

  return (
    <div className='container'>
      <div className='heading-modal'>
        <h2>{selectedTask?.label}</h2>
        <DotMenu forItem={TASK} />
      </div>
      <p className='description'>{selectedTask?.description}</p>
      <div className='subtasks-container'>
        <p className='subtask-status'>
          Subtasks {`(${numCompleteSubtasks} of ${numOfSubtasks})`}
        </p>
        {selectedTask?.subTasks.map((subtask) => {
          return (
            <div className='subtask' key={`${subtask.id}_subtask`}>
              <Checkbox
                checked={subtask.isDone}
                onChange={() => {
                  handleCheckSubtask({
                    taskId: selectedTask?.id || '',
                    columnId: selectedColumn?.id || '',
                    boardId: currentBoard?.id || '',
                    subtaskId: subtask.id,
                  });
                }}
              />
              <label
                className={`${subtask.isDone ? 'checked ' : ''}label-subtask`}
              >
                {subtask.label}
              </label>
            </div>
          );
        })}
      </div>
      <Dropdown
        label='Current Status'
        value={selectedColumn?.id}
        options={statusOptions}
        onChange={(e) => {
          handleChangeTaskStatus({
            taskId: selectedTask?.id || '',
            oldColumnId: selectedColumn?.id || '',
            newColumnId: e.value,
            boardId: currentBoard?.id || '',
          });
        }}
      />
    </div>
  );
};
