import {Link} from "react-router-dom";

const BlogList = (props ) =>{


    return <div>
        <h1>{props.title}</h1>
        {props.blogs.map(blog=>
            <div className={"blog-preview"} key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                <h2>{blog.title}</h2>
                <p>Written By {blog.author}</p>
                </Link>
                <button onClick={()=>props.handleDelete(blog.id)}>Delete</button>
            </div>
        )}
    </div>

}

export default BlogList;