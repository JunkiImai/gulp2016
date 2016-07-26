/////////////////////
// プラグインの読み込み
/////////////////////

// gulpの読み込み。
var gulp = require('gulp');
// gulp-sassの読み込み。
var sass = require('gulp-sass');
// gulp-autoprefixerの読み込み。
var autoprefixer = require('gulp-autoprefixer');
require('es6-promise').polyfill();
// browser-syncの読み込み。
var browserSync = require('browser-sync');
// gulp-notifyの読み込み。>>全部のタスクが完了したら通知したいので一番最後に記述するようにする。
var notify = require('gulp-notify');
// gulp-plumberの読み込み。>>タスクの１番初めに読み込ませる。
var plumber = require('gulp-plumber');
// gulp-utilの読み込み。
var gutil = require('gulp-util');
// gulp-ftpの読み込み。
var ftp = require('gulp-ftp');


//////////////////
// オプションの設定
//////////////////

var autoprefixerStyles = {
  outputStyle: 'compressed',
  sourceMap: true,
  sourceComments: false
};
var autoprefixerOptions = {
  // 対策ブラウザの設定。2016-07-24に設定。
  browsers: ['last 3 version', 'ie >= 9', 'Android 4.0']
};

// //gulp-ftpの設定。
// var ftpOptions = {
//   host:,
//   port:,
//   user:,
//   pass:,
//   remotePath:
// };

//////////////////////////////////////////////////////////////////////////////////
//
// ・タスクの設定。
//    gulp.task('タスク名', function() {
//     ここに実行したときの処理を書く。
//    });
//
// ・監視タスクの設定。
//    gulp.watch(['監視するファイルのパターン'],['タスク名']);
//
// ・パスの指定例。
//    1)sassディレクトリ直下のSCSSファイルを指定する。
//      gulp.src('sass/*.scss')
//
//    2)sassディレクトリ以下にあるすべてのSCSSファイルを指定する。
//      gulp.src('sass/**/*.scss')
//
//    3)sass/sample以下にあるSCSSファイルを除くsassディレクトリ以下のSCSSファイルを指定する。
//      gulp.src('sass/**/*.scss', '!sass/sample/**/*.scss')
//
//////////////////////////////////////////////////////////////////////////////////

// sassコンパイルタスクの設定：[gulp sass]で実行。
gulp.task('sass', function(){
	// コンパイルするsassファイルのパスを設定。
	gulp.src('path')
    // gulp-plumberを設定。
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    // コンパイルの設定。
		.pipe(sass(autoprefixerStyles))
    // オートプリフィックスの設定。
    .pipe(autoprefixer(autoprefixerOptions))
    // 出力先の設定。
		.pipe(gulp.dest())
    // browser-syncで再描画する設定。
    .pipe(browserSync.stream())
    // コンパイル時の通知設定。
    .pipe(notify({
      title: "compiled!",
      message: new Date(),
      // icon: 'dirname/icon.png'
    }));
});

// ftpでのアップロードタスクの設定。
gulp.task('ftp', function(){
  //アップロードするディレクトリを指定。
  gulp.src()
    .pipe(ftp(ftpOptions))
    .pipe(gutil.noop());
});

// デフォルトタスクの設定：[gulp]で実行。
gulp.task('default', function(){
  // ローカルサーバを立ち上げる。
  browserSync.init({
    server: {
      // 表示させたいファイルのあるディレクトリを指定。
      baseDir: 'path'
    }
  });
  // 監視タスクの設定。
  gulp.watch('path', ["sass"]);
  gulp.watch('path', ["sass"]);
});