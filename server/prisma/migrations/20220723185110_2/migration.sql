-- DropForeignKey
ALTER TABLE "favorites_posts_users" DROP CONSTRAINT "favorites_posts_users_postId_fkey";

-- DropForeignKey
ALTER TABLE "favorites_posts_users" DROP CONSTRAINT "favorites_posts_users_userId_fkey";

-- DropForeignKey
ALTER TABLE "followers" DROP CONSTRAINT "followers_followedId_fkey";

-- DropForeignKey
ALTER TABLE "followers" DROP CONSTRAINT "followers_followerId_fkey";

-- DropForeignKey
ALTER TABLE "liked_posts_users" DROP CONSTRAINT "liked_posts_users_postId_fkey";

-- DropForeignKey
ALTER TABLE "liked_posts_users" DROP CONSTRAINT "liked_posts_users_userId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_userId_fkey";

-- DropForeignKey
ALTER TABLE "posts_tags" DROP CONSTRAINT "posts_tags_postId_fkey";

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_followedId_fkey" FOREIGN KEY ("followedId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites_posts_users" ADD CONSTRAINT "favorites_posts_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites_posts_users" ADD CONSTRAINT "favorites_posts_users_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liked_posts_users" ADD CONSTRAINT "liked_posts_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liked_posts_users" ADD CONSTRAINT "liked_posts_users_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
