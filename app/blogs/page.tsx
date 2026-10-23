import { getBlogs } from '../services/blogs'

export default async function BlogsPage() {
  const blogs = await getBlogs()

  return (
    <div>
      <h1>Blogs</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {blogs.map((blog) => (
          <li key={blog.id} style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
            <h2>{blog.title}</h2>
            <p><strong>Autor:</strong> {blog.author}</p>
            <p><strong>URL:</strong> <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></p>
            <p><strong>Me gusta:</strong> {blog.likes}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}