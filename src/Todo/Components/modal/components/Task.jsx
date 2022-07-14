import React, { useRef, useState } from 'react'
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

const Task = () => {
    const [text, setText] = useState('');
    const [taskList, setTaskList] = useState([]);
    const ref = useRef();

    const handleCreateTask = ({ target: { value } }) => {
        const firstLetter = value;
        setTaskList((prev) => ([...prev, {
            complete: false,
            text: firstLetter
        }]));
        ref.current.focus();
        console.log('ref',ref);
    }


    const changeValue = ({ target: { value } }, index) => {

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
        <Box>
            <Heading fontSize={'md'} py={3}>List Task</Heading>
            <Stack direction={'column'}>

                {Boolean(taskList.length) && (
                    <Stack>
                        {taskList.map(({ complete, text }, index) =>
                            <Stack direction='row' key={index}>
                                <Checkbox isChecked={complete} onChange={() => { changeComplet(index) }}></Checkbox>
                                <Input ref={ref} textDecoration={complete ? 'line-through' : 'none'} bgColor={complete ? 'gray.300' : 'white'} value={text} onInput={(e) => { changeValue(e, index) }} />
                            </Stack>
                        )}
                    </Stack>
                )}

                <Stack direction={'row'} alignItems='center'>
                    <AddIcon />
                    <Input placeholder='Elemento de la lista' w={'200px'} value={text} onInput={handleCreateTask} />
                </Stack>

            </Stack>
        </Box>
    )
}

export default Task