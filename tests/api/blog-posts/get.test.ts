import { expect } from 'chai';
import { BlogPost, BlogPosts } from '@service/blog-posts';
import { StatusCode } from '@constant/http-response-codes';

describe('Get blog posts', function () {
  const blogPosts = new BlogPosts();

  let blogPost: BlogPost;

  before('Get a blog post to use for searching and updates', async function () {
    await blogPosts.getAllPosts().then((response) => {
      expect(response.status).to.equal(StatusCode.Ok);
      blogPost = response.data[0];
    });
  });

  it('should return all blog posts', async function () {
    await blogPosts.getAllPosts().then((response) => {
      const posts = response.data;
      expect(posts).to.be.an('Array');
      posts.forEach((post) => {
        expect(post).to.have.all.keys(['id', 'title', 'body', 'userId']);
      });
    });
  });

  it('should return blog post details', async function () {
    await blogPosts.getPost(blogPost.id).then((response) => {
      const post = response.data;
      expect(post).to.be.an('Object');
      expect(post).to.have.keys(['id', 'title', 'body', 'userId']);
    });
  });

  it('should return page not found error when getting a post with an invalid post id', async function () {
    // @ts-expect-error - Ignore type number requirement
    await blogPosts.getPost('error').then((response) => {
      expect(response.status).to.equal(StatusCode.NotFound);
    });
  });

  it('should return blog posts of a user given a user id', async function () {
    await blogPosts.getPostsByUser(blogPost.userId).then((response) => {
      const posts = response.data;
      expect(posts).to.be.an('Array');
      posts.forEach((post) => {
        expect(post.userId).to.equal(blogPost.userId);
      });
    });
  });

  it('should return an empty list if user does not exist', async function () {
    // @ts-expect-error - Ignore type number requirement
    await blogPosts.getPostsByUser('error').then((response) => {
      const posts = response.data;
      expect(posts).to.be.an('Array');
      expect(posts).to.be.empty;
    });
  });
});
