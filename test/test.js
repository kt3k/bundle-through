var bundler = require('../')

var test = require('tape')
var through2 = require('through2')
var vfs = require('vinyl-fs')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')
var concat = require('concat-stream')

var path = require('path')

var fixtureRoot = path.join(__dirname, 'fixture')

test('bundler() bundles scripts in the vinyl stream', function (t) {

  vfs.src(fixtureRoot + '/foo.js').pipe(bundler()).pipe(through2.obj(function (file, _, callback) {
    t.ok(file.isBuffer(), 'The file is buffer')

    var bundledScript = file.contents.toString()

    t.ok(/This is foo\.js/.test(bundledScript), 'The file contains foo.js')
    t.ok(/This is bar\/baz\.js/.test(bundledScript), 'The file contains bar/baz.js')

    t.end()
  }))

})

test('browserify.src() emits error when unable to bundle script', function (t) {
  vfs.src(fixtureRoot + '/error.js').pipe(bundler()).on('error', function (err) {
    t.ok(err instanceof Error, 'It emits error instance')
    t.end()
  })
})

test('when buffer option is false, file.contents is a stream', function (t) {

  vfs.src(fixtureRoot + '/foo.js').pipe(bundler({buffer: false})).pipe(through2.obj(function (file, enc, callback) {

    t.ok(file.isStream(), 'The file is stream type')
    t.end()

  }))

})

test('when sourcemaps option is true, the output has sourcemaps', function (t) {
  vfs.src(fixtureRoot + '/foo.js')
    .pipe(bundler({sourcemaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(through2.obj(function (file, enc, callback) {

      t.ok(file.isBuffer(), 'The file is buffer type')

      var contents = file.contents.toString()

      t.ok(/This is foo\.js/.test(contents), 'The file contains foo.js')
      t.ok(/This is bar\/baz\.js/.test(contents), 'The file contains bar/baz/js')
      t.ok(/sourceMappingURL=/.test(contents), 'The file contains source maps')

      t.end()

    }))
})
