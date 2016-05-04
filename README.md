# bundle-through v1.0.2

> Bundle CommonJS scripts through vinyl stream, using browserify.

# Install

    npm install bundle-through

# Usage

```js
const bundler = require('bundle-through')
const gulp = require('gulp')

gulp.src('src/js/pages/*.js')
  .pipe(bundler())
  .pipe(gulp.dest('dist/'))
```

This bundles all CommonJS scripts (`require` / `module.exports`) through the stream. Each entry in the stream is considered as the only entrypoint of the bundle.

## Add transform

`bundle-through` takes arguments and they are passed to browserify. For example, you can pass `transform` option to add the transforms.

```js
gulp.src('src/js/pages/*.js')
  .pipe(bundler({transform: 'babelify'}))
  .pipe(gulp.dest('dist/'))
```

## Add sourcemap

Set `sourcemaps` option `true` and write sourcemaps using `gulp-sourcemaps`.

```js
const sourcemaps = require('gulp-sourcemaps')

gulp.src('src/js/pages/*.js')
  .pipe(bundler({sourcemaps: true}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist/'))
```

# API Reference

```
const bundler = require('bundle-through')
```

## bundler(options)

- @param {boolean} buffer `true` iff you want output file to have buffer type contents. Default is `true`. If set `false`, the output file has file contents as a stream.
- @param {boolean} sourcemaps `true` iff you want to output sourcemaps. You need to *write* it using `gulp-sourcemaps`.
- These options are directly passed to `browserify`. See [the documents](https://github.com/substack/node-browserify#browserifyfiles--opts) for details.
- @return {Transform<Vinyl, Vinyl>}

This returns Transform stream of the object mode which transform CommonJS scripts into the bundle using browserify. Each entry in the stream is considered as the only entrypoint of the bundle and therefore input and output files has the 1-to-1 relationship.

# License

MIT
