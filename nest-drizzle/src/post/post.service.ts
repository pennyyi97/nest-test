import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import type { DrizzleDB } from 'src/drizzle/types/drizzle';
import { posts } from 'src/drizzle/schema/posts.schema';
import { users } from 'src/drizzle/schema/users.schema';
import { eq } from 'drizzle-orm';
import { groups, usersToGroups } from 'src/drizzle/schema/groups.schema';

@Injectable()
export class PostService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  async findAll() {
    // return await this.db.select().from(posts);
    const rows = await this.db
      .select()
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .leftJoin(usersToGroups, eq(posts.authorId, usersToGroups.userId))
      .leftJoin(groups, eq(usersToGroups.groupId, groups.id));
    // .where(eq(posts.id, 20));
    return rows.map((r) => ({
      ...r.posts,
      author: {
        ...r.users,
        usersToGroups: [{ ...r.UsersToGroups, groups: r.groups }],
      },
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.db
      .update(posts)
      .set({
        title: 'AAAAAAA',
      })
      .where(eq(posts.id, id));
  }

  async remove(id: number) {
    return await this.db.delete(posts).where(eq(posts.id, id));
  }
}
