const postQuery = (id) => `
{
  posts(where: { id: "${id}" }) {
    title
    date
    author {
      name
    }
    content {
      markdown
    }
    body
  }
}
`;

const postsQuery = `
{
  posts {
    title
    date
    author {
      name
    }
    coverImage {
      url
    }
    slug
    id
  }
}
`;

export const getPosts = async (id) => {
  const res = await fetch(
    `https://api-eu-central-1.graphcms.com/v2/ckc31lc3t00s501z63ch5f5o1/master`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: id ? postQuery(id) : postsQuery,
      }),
    },
  );
  const { data } = await res.json();
  return id ? data?.posts[0] : data?.posts;
};
