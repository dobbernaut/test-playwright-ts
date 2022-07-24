import { expect } from 'chai';
import { BlogPost, BlogPosts, NewBlogPost, UpdateBlogPost } from '@service/blog-posts';
import { StatusCode } from '@constant/http-response-codes';

describe('Add update blog posts', function () {
  const blogPosts = new BlogPosts();

  let blogPost: BlogPost;

  before('Get a blog post to use for searching and updates', async function () {
    await blogPosts.getAllPosts().then((response) => {
      expect(response.status).to.equal(StatusCode.Ok);
      blogPost = response.data[0];
    });
  });

  describe('Create blog post', function () {
    it('should add a new blog post', async function () {
      const newPost: NewBlogPost = {
        title: 'New Title',
        body: 'New blog details',
        userId: 1,
      };

      await blogPosts.addPost(newPost).then((response) => {
        expect(response.status).to.equal(StatusCode.Created);
        expect(response.data).to.have.property('id');
      });
    });
  });

  describe('Update blog posts', function () {
    it('Should update an existing blog post', async function () {
      const postUpdate: UpdateBlogPost = {
        id: blogPost.id,
        title: 'this is the updated title',
      };

      await blogPosts.updatePost(postUpdate).then((response) => {
        expect(response.status).to.equal(StatusCode.Ok);
        expect(response.data).to.include(postUpdate);
      });
    });

    it('Should return an internal server error when updating a post that does not exist', async function () {
      const postUpdate: UpdateBlogPost = {
        // @ts-expect-error - Ignore type number requirement
        id: 'error',
        title: 'this should not update',
      };

      await blogPosts.updatePost(postUpdate).then((response) => {
        expect(response.status).to.equal(StatusCode.InternalServerError);
      });
    });
  });
});
