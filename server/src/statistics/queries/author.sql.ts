export const authorQuery = (authorId: number) =>
  [
    `select`,
    `cast (count(P."id") as INTEGER) as "posts",`,
    `cast (coalesce(sum(P."views"), 0) as INTEGER) as "views",`,
    `cast (coalesce(sum(F."favorites"), 0) as INTEGER) as "favorites",`,
    `cast (coalesce(sum(L."likes"), 0) as INTEGER) as "likes"`,
    `from posts P`,
    `left join (`,
    `select "postId", COUNT("id") as "favorites" from favorites_posts_users`,
    `group by "postId"`,
    `) F on F."postId" = P."id"`,
    `left join (`,
    `select "postId", COUNT("id") as "likes" from liked_posts_users`,
    `group by "postId"`,
    `) L on L."postId" = P."id"`,
    `where P."userId" = ${authorId} and P."status" = 'ACTIVE'`,
  ].join(' ');
