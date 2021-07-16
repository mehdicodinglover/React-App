import {useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import BlogList from "./BlogList";

const Home = ()=>{

    const [blogs, setBlogs] = useState(null);
    const [isPending, setPen] = useState(true);
    const [error,setError] = useState(null);

    async function fetchTheBlogs() {
        const response = await fetch( 'http://localhost:7000/blogs');
        const data = await response.json();
        return data;
    }


    const handleDelete =  (key)=>{
        //const newBlogs = blogs.filter(blog=>blog.id!==key);
        //setBlogs (newBlogs);

        fetch('http://localhost:7000/blogs/'+key,{
            method: 'DELETE',
            headers: {'content-type':'application/json'}
        }).then(()=>console.log('deleted!'));
        window.location.reload();

        //history.push('/');

    }

    useEffect(()=>{
        fetchTheBlogs().then(data=>{
            setPen(false);
            if(!data){
                throw Error('cannot fetch the data!');
            }else {
                setBlogs(data);
            }
        }).catch(err=>{setError(err.message);
        setPen(false);
        });
    },[]);

    return(
        <div className='home'>
            {isPending && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {blogs&&<BlogList blogs={blogs} title = "All Blogs : " handleDelete = {handleDelete} />}
            {blogs&&<BlogList blogs={blogs.filter(blog=>blog.author ==='mario')} title = "Mario's Blogs : " handleDelete={handleDelete} />}
        </div>
    )
};

export default Home;