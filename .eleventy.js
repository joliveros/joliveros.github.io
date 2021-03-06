const filters = require('./utils/filters.js')
const transforms = require('./utils/transforms.js')
const collections = require('./utils/collections.js')
const markdownIt = require("markdown-it");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
	// Folders to copy to build dir (See. 1.1)
	eleventyConfig.addPassthroughCopy("src/static");
	eleventyConfig.addPassthroughCopy("src/work/**/*.{jpg,jpeg,png,gif}");

	// Filters
	Object.keys(filters).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, filters[filterName])
	})

	// Transforms
	Object.keys(transforms).forEach((transformName) => {
		eleventyConfig.addTransform(transformName, transforms[transformName])
	})

	// Collections
	Object.keys(collections).forEach((collectionName) => {
		eleventyConfig.addCollection(collectionName, collections[collectionName])
	})

	// This allows Eleventy to watch for file changes during local development.
	eleventyConfig.setUseGitIgnore(false);

	eleventyConfig.setDataDeepMerge(true);

	eleventyConfig.addWatchTarget('work');

	eleventyConfig.addPlugin(syntaxHighlight);

	eleventyConfig.setLibrary("md", markdownIt({
		html: true,
		breaks: true,
		linkify: true
	}).use(require('markdown-it-figure')));

	return {
		dir: {
			input: "src/",
			output: "dist",
			includes: "_includes",
			layouts: "_layouts"
		},
		templateFormats: ["html", "md", "njk"],
		htmlTemplateEngine: "njk",

		// 1.1 Enable eleventy to pass dirs specified above
		passthroughFileCopy: true
	};
};
