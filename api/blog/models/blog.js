'use strict';

const slugify = require('slugify');

// Checks for identicle title then creates unques slug
const getUniqueSlug = async (title, num=0) => {
  let input = `${title}`;
  if (num > 0) {
    input = `${title}-${num}`;
  }
  const slug = slugify(input, {
    lower: true
   });
  const [blog] = await strapi.services.blog.find({
    slug: slug
  });
  if (!blog){
    return slug;
  }
  else {
    return getUniqueSlug(title, num+1);
  }
}

module.exports = {
/**
   * Triggered before user creation.
   */

lifecycles: {
    beforeCreate: async (data) => {
      data.slug = await getUniqueSlug(data.title);
    },
  },

};
