export interface Blog {
  id: string
  title: string
  author: string
  url: string
  likes: number
}

const initialBlogs: Blog[] = [
  {
    id: '1',
    title: 'Componentes de Servidor en React',
    author: 'Dan Abramov',
    url: 'https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023',
    likes: 12
  },
  {
    id: '2',
    title: 'Primeros pasos con Next.js App Router',
    author: 'Vercel Team',
    url: 'https://nextjs.org/blog/next-13-4',
    likes: 25
  }
]

export const getBlogs = async (): Promise<Blog[]> => {
  return initialBlogs
}