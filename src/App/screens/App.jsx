/**
 * External dependencies
 */
import React from 'react'
import Layout from '../components/Layout'

/**
 * Internal dependencies
 */
import Body from '../../Todo/screens/Body';
import { TodoProvider } from '../../Todo/context'


const App = () => {

    return (
        <TodoProvider>
            <Layout>
                <Body />
            </Layout>
        </TodoProvider>
    )
}

export default App