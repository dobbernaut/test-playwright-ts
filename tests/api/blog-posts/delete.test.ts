import { expect } from 'chai';
import { BlogPost, BlogPosts } from '@service/blog-posts';
import { StatusCode } from '@constant/http-response-codes';

describe('Delete blog posts', function () {
  const blogPosts = new BlogPosts();

  let blogPost: BlogPost;

  before('Get a blog post to use for searching and updates', async function () {
    await blogPosts.getAllPosts().then((response) => {
      expect(response.status).to.equal(StatusCode.Ok);
      blogPost = response.data[0];
    });
  });

  it('Should remove an existing blog post', async function () {
    await blogPosts.deletePost(blogPost.id).then((response) => {
      expect(response.status).to.equal(StatusCode.Ok);
    });
  });
});
