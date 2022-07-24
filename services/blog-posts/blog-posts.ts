import axios, { AxiosResponse } from 'axios';
import { siteUrl } from '@config/config';

export interface BlogPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// this type derives from the BlogPost interface excluding the id property
export type NewBlogPost = Omit<BlogPost, 'id'>;

// this type derives from the BlogPost interface including the id with the title and body as optional
export type UpdateBlogPost = Pick<BlogPost, 'id'> & Partial<Pick<BlogPost, 'title' | 'body'>>;

export class BlogPosts {
  private readonly baseURL = siteUrl.jsonplaceholder;

  // return type is an array of BlogPosts
  async getAllPosts(): Promise<AxiosResponse<BlogPost[]>> {
    return await axios
      .get(`${this.baseURL}/posts`)
      .then((response) => response)
      .catch((error) => error.response);
  }

  async getPostsByUser(userId: number): Promise<AxiosResponse<BlogPost[]>> {
    return await axios
      .get(`${this.baseURL}/posts`, { params: { userId } })
      .then((response) => response)
      .catch((error) => error.response);
  }

  async getPost(id: number): Promise<AxiosResponse<BlogPost>> {
    return await axios
      .get(`${this.baseURL}/posts/${id}`)
      .then((response) => response)
      .catch((error) => error.response);
  }

  async addPost(post: NewBlogPost): Promise<AxiosResponse<BlogPost>> {
    return await axios
      .post(`${this.baseURL}/posts`, post)
      .then((response) => response)
      .catch((error) => error.response);
  }

  async updatePost(post: UpdateBlogPost): Promise<AxiosResponse<UpdateBlogPost>> {
    const { id, ...update } = post;
    return await axios
      .put(`${this.baseURL}/posts/${id}`, update)
      .then((response) => response)
      .catch((error) => error.response);
  }

  // return type is an empty object
  async deletePost(id: number): Promise<AxiosResponse<Record<string, never>>> {
    return await axios
      .delete(`${this.baseURL}/posts/${id}`)
      .then((response) => response)
      .catch((error) => error.response);
  }
}
