
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const SearchBox = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/employees');
        }
    };
    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Employees by name...'
                className='mr-sm2 ml-sm-5'
            ></Form.Control>
            <Button type='submit' variant='outline-success'>
                Search
            </Button>
        </Form>
    );
};

export default SearchBox;