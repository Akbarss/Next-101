import Link from "next/link";

export async function getStaticProps() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    // Проверяем, если данные успешно получены
    if (!data || data.length === 0) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        posts: data,
      },
    };
  } catch (error) {
    // Ловим любые ошибки при загрузке данных
    console.error("Error fetching data:", error);
    return {
      props: {
        posts: [],
      },
    };
  }
}

export default function CoursesPage({ posts }) {
  if (!posts || posts.length === 0) {
    return <div>Нет данных для отображения</div>;
  }

  return (
    <div>
      <h1>Список постов</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <p>{post.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
