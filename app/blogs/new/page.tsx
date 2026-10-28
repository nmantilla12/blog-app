import { createBlog } from '../../services/blogs'

export default function NewBlogPage() {
  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '1rem' }}>
      <h1>Crear un nuevo blog</h1>

      <form action={createBlog} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Título:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div>
          <label htmlFor="author" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Autor:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div>
          <label htmlFor="url" style={{ display: 'block', marginBottom: '0.5rem' }}>
            URL:
          </label>
          <input
            type="url"
            id="url"
            name="url"
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <button
          type="submit"
          style={{ padding: '0.75rem', backgroundColor: '#0070f3', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Crear
        </button>
      </form>
    </div>
  )
}