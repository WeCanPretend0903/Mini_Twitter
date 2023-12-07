import userData from '../Data/UserData.json';
import postData from '../Data/UserPost.json';
import profile from '../img/profile.png';

const BALANCE_KEY_PREFIX = 'balance_';

export const setBalance = (userId, balance) => {
  const user = userData.users.find((user) => user.id === userId);
  localStorage.setItem(`${BALANCE_KEY_PREFIX}${user.id}`, JSON.stringify(balance));
};

export const getBalance = (userId) => {
  const user = userData.users.find((user) => user.id === userId);
  const storedBalance = localStorage.getItem(`${BALANCE_KEY_PREFIX}${user.id}`);
  if (storedBalance !== null) {
    try {
      const parsedBalance = JSON.parse(storedBalance);
      if (typeof parsedBalance === 'number' && !isNaN(parsedBalance)) {
        return parsedBalance;
      }
    } catch (error) {
      console.error('Error parsing stored balance:', error);
    }
  }
  return user ? user.balance : 0;
};

export const getPosts = () => {
  const posts = localStorage.getItem('posts');
  return posts ? JSON.parse(posts) : [];
}
export const setPosts = (posts) => {
  localStorage.setItem('posts', JSON.stringify(posts));
}
export const addPost = (newPost) => {
  const currentPosts = getPosts();
  const updatedPosts = [newPost, ...currentPosts]
  setPosts(updatedPosts);
}
export const setInitialPosts = () => {
  const initialPosts = postData.posts.map((post) => ({
    ...post,
    key: post.postId,
    postId: post.postId,
    username: post.name || post.author || 'Username',
    profilepic: post.profilePicture || profile,
    timestamp: post.time || post.timestamp,
    content: post.content,
    mediaFile: post.mediaFile ? post.mediaFile : '',
    keywords: post.keywords,
    likes: post.likes,
    dislikes: post.dislikes,
    shares: post.shares
  }));
  setPosts(initialPosts);
}
export const removePost = (postId) => {
  const currentPosts = getPosts();
  const posts = currentPosts.filter(post => post.postId !== postId);
  setPosts(posts);
}