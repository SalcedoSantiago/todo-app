import React, { useRef, useState, useEffect } from 'react'
import {
    Box,
    Heading,
    Stack,
    Input,
    Checkbox,

} from '@chakra-ui/react';
import {
    AddIcon
} from '@chakra-ui/icons';

const Task = (props) => {

    const {
        value,
        setCurrentTodo
    } = props;

    const [text, setText] = useState('');
    const [taskList, setTaskList] = useState(Boolean(value) ? value : []);
    const ref = useRef();
    const prevTaskList = usePrevious(taskList);
    const refInput = useRef();

    const handleCreateTask = ({ target: { value } }) => {
        const firstLetter = value;
        setTaskList((prev) => ([...prev, {
            complete: false,
            text: firstLetter
        }]));
    }

    useEffect(() => {
        if (prevTaskList?.length < taskList?.length) {
            ref.current.focus();
        }

        setCurrentTodo((prev) => ({
            ...prev,
            ['tasks']: taskList
        }))
    }, [taskList])


    const changeValue = (e, index) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            refInput.current.focus();
        }

        const { target: { value } } = e;
        const modifyTask = taskList.map((task, _index) => {
            if (_index == index) {
                return {
                    ...task,
                    ['text']: value
                }
            }
            return task;
        })
        setTaskList(modifyTask)
    }


    const changeComplet = (index) => {
        const modifyTask = taskList.map((task, _index) => {
            if (_index == index) {
                return {
                    ...task,
                    ['complete']: !task['complete']
                }
            }
            return task;
        })

        setTaskList(modifyTask)
    }

    return (
        <Box minH={'300px'} maxH="300px" overflowY={'scroll'} >
            <Stack direction={'column'}>
                {Boolean(taskList.length) && (
                    <Stack>
                        {taskList.map(({ complete, text }, index) =>
                            <Stack direction='row' key={index} px={4}>
                                <Checkbox isChecked={complete} onChange={() => { changeComplet(index) }}></Checkbox>
                                <Input
                                    ref={ref}
                                    textDecoration={complete ? 'line-through' : 'none'}
                                    bgColor={complete ? 'gray.300' : 'white'}
                                    value={text}
                                    onInput={(e) => { changeValue(e, index) }}
                                    onKeyPress={(ev) => {
                                        if (ev?.key === "Enter" || ev?.keyCode === 13) {
                                            refInput.current.focus();
                                        }
                                    }
                                    }
                                />
                            </Stack>
                        )}
                    </Stack>
                )}
                <Stack direction={'row'} alignItems='center' px={4} py={2}>
                    <AddIcon style={{ color: '#bebebe' }} />
                    <Input ref={refInput} placeholder='Elemento de la lista' value={text} onInput={handleCreateTask} />
                </Stack>

            </Stack>
        </Box>
    )
}

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

export default Task