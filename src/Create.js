import {useState} from 'react';
import {useHistory} from 'react-router-dom';

const Create = () => {

    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [author, setAuthor] = useState('Mahdi');
    const history = useHistory();


    return (
        <div className={'create'}>
            <h2>Add New Blog</h2>
        <form onSubmit={(e)=>{
            e.preventDefault();
            //e.target.reset();
            const blog = {title:title,author:author,body:body};
            fetch('http://localhost:7000/blogs',{
                method:'POST',
                headers:{"content-type":"application/json"},
                body: JSON.stringify(blog)
            }).then(()=>{
                console.log('data was attached to json file');
                history.push('/');
            })
        }}>
            <label>title: </label>
            <input
                required
                onChange={e=>{setTitle(e.target.value);}}
            />
            <label>body: </label>
            <textarea
                required
                onChange={e=>{setBody(e.target.value);}}
            />
            <label>author: </label>
            <select
                onChange={e=>{setAuthor(e.target.value);}}
            >
                <option value={'mahdi'}>mahdi</option>
                <option value={'guest'}>guest</option>
            </select>

            <button type={'submit'}>ADD</button>
            <h3>{title}</h3>
            <p>by {author} : </p>
            <p>{body}</p>
        </form>
        </div>
    );
}


export default Create;