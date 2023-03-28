import { useState } from "react";

import { useBoards } from "src/providers/board/BoardProvider";
import { useDialog } from "src/providers/dialog/DialogProvider";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";
import { CloseSvg } from "../SVGs/CloseSvg";
import { TextField } from "../TextField";
import { TextFieldArea } from "../TextFieldArea";
import * as S from "./styled";

export const AddEditTask = ({ boardId }: { boardId?: string }) => {
  const [task, setTask] = useState<{
    label: string;
    description: string;
    status: string;
    subTasks: { label: string }[];
  }>({
    label: "",
    description: "",
    status: "",
    subTasks: [],
  });
  const [status, setStatus] = useState();
  const [{ boards }, { handleAddTask }] = useBoards();
  const [, { closeDialog }] = useDialog();

  console.log(task);

  const handleAddSubTask = () => {
    setTask((prevValue) => {
      return {
        ...prevValue,
        subTasks: [...prevValue.subTasks, { label: "" }],
      };
    });
  };

  const dissmissColumn = (label: string) => {
    setTask((prevValue) => ({
      ...prevValue,
      subTasks: [
        ...prevValue.subTasks.filter((subTask) => subTask.label !== label),
      ],
    }));
  };

  const board = boards.find((board) => board.id === boardId);
  const statusOptions = board?.columns?.map((column) => ({
    label: column.label,
    value: column.id,
  }));

  return (
    <S.TaskFormContainer>
      <TextField
        onChange={(e) => {
          setTask((prevValue) => {
            return { ...prevValue, label: e.target.value };
          });
        }}
        value={task.label}
        label="Title"
        placeholder="e.g. Take coffee break"
      />
      <TextFieldArea
        onChange={(e) => {
          setTask((prevValue) => {
            return { ...prevValue, description: e.target.value };
          });
        }}
        value={task.description}
        autoResize
        label="Description"
        placeholder="e.g. It’s always good to take a break. This 15 minute break will 
                    recharge the batteries a little."
      />
      <S.SubTasksContainer>
        {task.subTasks.map((subTask, idx) => {
          return (
            <S.DissmissableTextField>
              <TextField
                {...(idx === 0 && {
                  label: "Subtasks",
                })}
                value={task.subTasks[idx].label}
                onChange={(e) => {
                  setTask((prevValue) => {
                    const values = { ...prevValue };
                    values.subTasks[idx].label = e.target.value;
                    return values;
                  });
                }}
              />
              <Button
                icon={<CloseSvg />}
                onClick={() => {
                  dissmissColumn(subTask.label || "");
                }}
                style={{
                  ...(idx === 0 && { marginTop: "24px" }),
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  height: "fit-content",
                }}
                padding="0"
              />
            </S.DissmissableTextField>
          );
        })}

        <Button
          label="+ Add New Subtask"
          color="secondary"
          onClick={handleAddSubTask}
        />
      </S.SubTasksContainer>
      <Dropdown
        label="Status"
        value={status}
        onChange={(e) => {
          setStatus(e.value);
          setTask((prevValue) => {
            return { ...prevValue, status: e.value };
          });
        }}
        options={statusOptions}
      />
      <Button
        label="Create Task"
        onClick={() => {
          closeDialog();
          handleAddTask({ ...task, boardId });
        }}
      />
    </S.TaskFormContainer>
  );
};
