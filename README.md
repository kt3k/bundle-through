# bundle-through v1.0.0

> Bundle CommonJS scripts through vinyl stream, using browserify.

# Install

    npm install bundle-through

# Usage

```js
const bundler = require('bundle-through')
const vfs = require('vinyl-fs')

vfs.src('src/js/pages/*.js')
  .pipe(bundler())
  .pipe(vfs.dest('dist/'))
```

This bundles all files through the stream. Each entry in the stream is considered as the only entrypoint of the bundle.

## Add transform

`bundle-through` takes arguments and they are passed to browserify. For example, you can pass `transform` option to add the transforms.

```js
vfs.src('src/js/pages/*.js')
  .pipe(bundler({transform: 'babelify'}))
  .pipe(vfs.dest('dist/'))
```

# License

MIT
