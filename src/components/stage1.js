import React, {useState, useContext, useRef} from 'react';
import { Button, Form, Alert, FormGroup} from 'react-bootstrap'
import {MyContext} from '../context'

const Stage1 = () => {
    const textInput = useRef();
    const context = useContext(MyContext);
    const [error, setError] = useState([false,'']);

    const handleSubmit = (e) => {
        // this function prevents the page from auto refreshing after clicking the submit button
        e.preventDefault();
        const value = textInput.current.value;
        const validate = validateInput(value);
        
        if(validate){
            setError([false,''])
            context.add(value);
            textInput.current.value = '';
        }
    }

    const validateInput = (value) => {
        if(value === ''){
            setError([true,'You gotta put something in!'])
            return false
        }
        if(value.length <= 2){
            setError([true,'I don\'t think that\'s the name'])
            return false
        }

        return true
    }

    console.log(context.state);

    return(
        <>
            <Form onSubmit={handleSubmit} className='mt-4'>
                <FormGroup>
                    <Form.Control
                        type='text'
                        placeholder='Add restaurant name'
                        name='restaurant'
                        ref={textInput}
                    />
                </FormGroup> 

                {
                    error[0] ?
                    <Alert>
                        {error[1]}
                    </Alert>
                    : null
                }

                <Button className='miami' variant='primary' type='submit'>
                    Add restaurant
                </Button>
                {
                    context.state.restaurants && context.state.restaurants.length > 0 ?
                    <>
                        <hr/>
                        <div>
                            <ul className='list-group'>
                                {
                                    context.state.restaurants.map((restaurant, idx) =>(
                                        <li 
                                        key={idx} 
                                        className='list-group-item 
                                                    d-flex 
                                                    justify-content-between 
                                                    align-items-center 
                                                    list-group-item-action'
                                        >
                                            {restaurant}
                                            <span 
                                                className='badge badge-danger' 
                                                onClick={()=> context.remove(idx)}
                                            >
                                                X
                                            </span>
                                        </li>
                                    ))
                                }
                            </ul>
                            <div
                                className='action_button'
                                onClick={()=>context.next()}
                            >
                                Next
                            </div>
                        </div>
                    </>
                    :
                    null
                }
            </Form>
        </>
    )
}

export default Stage1;