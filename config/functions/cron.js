'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */
  // '0 1 * * 1': () => {
  //
  // }
'*/1 * * * *': async () => {
    // fetch articles to publish
    const draftBlogToPublish = await strapi.api.blog.services.blog.find({
      status: 'draft', // preview returns both draft and published entries
    //  published_null: true,      // so we add another condition here to filter entries that have not been published
      published_lt: new Date(),
    });

    // update published_at of articles
    await Promise.all(draftBlogToPublish.map(blog => {
      return strapi.api.blog.services.blog.update(
        { id: blog.id },
        { status: 'published'},
        // { published_at: new Date() }
      );
    }));
  },
  
};
