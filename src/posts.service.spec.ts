import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: 'Some pre-existing post' });
  });

  it('should add a new post', () => {
    // act
    const createdPost = postsService.create(post);

    // assert
    expect(createdPost.text).toBe(post.text);
    expect(createdPost.id).toBe('2');
    expect(typeof createdPost.date).toBe('string');
    expect(createdPost.date).toBe(new Date(createdPost.date).toISOString());

    // проверяем, что пост действительно добавлен и доступен через find
    expect(postsService.find(createdPost.id)).toEqual(createdPost);
  });

  it('should find a post', () => {
    // arrange
    const createdPost = postsService.create(post);

    // act
    const foundPost = postsService.find(createdPost.id);
    const notFoundPost = postsService.find('non-existent-id');

    // assert
    expect(foundPost).toEqual(createdPost);
    expect(foundPost?.text).toBe(post.text);
    expect(notFoundPost).toBeUndefined();
  });
});