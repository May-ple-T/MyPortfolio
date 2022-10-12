var l_props = {
    "display": "flex",
    "justify-content": "center"
}

var s_props = {
    "display": "block"
}

// $(window).resize(() => {
//     var windowWidth = $(window).width();
//     if (windowWidth > 850) {
//         $('#profile').css(l_props);
//         $('#picture').css('padding-right', '10%');
//     }
//     else {
//         $('#profile').css(s_props);
//         $('#picture').css('padding-right', '0');
//     }
// })

$('#page-link a[href*="#"]').click(function () {
    var elmHash = $(this).attr('href'); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
    console.log(elmHash);
    var pos = $(elmHash).offset().top - 40;//idの上部の距離からHeaderの高さを引いた値を取得
    $('body,html').animate({ scrollTop: pos }, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
    return false;
});

//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
    var scroll = $(window).scrollTop();
    if (scroll >= 200) {//上から200pxスクロールしたら
        $('#page-top').removeClass('OverMove');//#page-topについているDownMoveというクラス名を除く
        $('#page-top').addClass('UpMove');//#page-topについているUpMoveというクラス名を付与
    } else {
        if ($('#page-top').hasClass('UpMove')) {//すでに#page-topにUpMoveというクラス名がついていたら
            $('#page-top').removeClass('UpMove');//UpMoveというクラス名を除き
            $('#page-top').addClass('OverMove');//DownMoveというクラス名を#page-topに付与
        }
    }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
    PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
    PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

$('#page-top').click(() => {
    $('body,html').animate({
        scrollTop: 0//ページトップまでスクロール
    }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
    return false;//リンク自体の無効化
});