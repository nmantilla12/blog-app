import { createBlog } from '../../services/blogs'
import Link from 'next/link'

export default function NewBlogPage() {
  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '1rem', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '1rem' }}>
        <Link href="/blogs" style={{ color: '#61dafb', textDecoration: 'none' }}>← Volver a la lista</Link>
      </div>

      <h1>Crear un nuevo blog / nota</h1>

      <form action={createBlog} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        <div>
          <label htmlFor="content" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Contenido:
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={4}
            style={{ width: '100%', padding: '0.5rem', background: '#1e1e1e', color: '#fff', border: '1px solid #444', borderRadius: '4px' }}
          />
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input type="checkbox" name="important" value="true" />
            Marcar como importante
          </label>
        </div>

        <button
          type="submit"
          style={{
            padding: '0.75rem',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Crear
        </button>
      </form>
    </div>
  )
}