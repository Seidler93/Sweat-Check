import MyPostCard from "./MyPostCard";

export default function MyPosts () {
  const posts = [1,1,1,1,1,1,1,1,1,11,]
  return (
    <div className='card, bg-light post'>
      {posts.map((post) => <MyPostCard post={post}/>)}
    </div>
  );
}