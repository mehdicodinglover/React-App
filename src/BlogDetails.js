import {useParams} from 'react-router-dom';
import {useState} from 'react';



const BlogDetails = () =>{

    const {id : myid} = useParams();

    const abortController = new AbortController(); // 1
    const abortSignal = abortController.signal; // 2

    async function fetchTheBlogs() {
        const response = await fetch( `http://localhost:7000/blogs/${myid}`,{signal:abortSignal});
        const data = await response.json();
        return data;
    }



    const [[title,author,body],setState] = useState('','','');
        fetchTheBlogs().then(data => {setState([data.title,data.author,data.body]);} )
            .catch(err=>{console.log(err.message)});



    return(
        <div className={'blog-details'}>
            <p>The article <strong>"{title}"</strong> is composed by <strong>{author}</strong>.</p>
            <p>Here is its texture : </p>
            <p>{body}</p>
        </div>
    );
    abortController.abort();
}

export default BlogDetails;