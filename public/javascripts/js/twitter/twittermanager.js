/**
 * TwitterManager
 * Oauth認証していたら使用可能
 * HTMLに以下コードを使用すること

<!-- Twitter Oauth 認証時のデータをJavaScriptで利用できるようにする -->
<% if (user) { %>
    <script> game.OAUTH = <%- JSON.stringify(user) %>; </script> 
<% } %>

 */
(function(ns) {

    ns.TwitterManager = tm.createClass({

        init: function () {
            console.dir(ns.OAUTH);
            this.oauth = ns.OAUTH;
        },

        addUserIcon: function (assets) {
            if (this.isLogin()) {
                // アイコン画像を追加
                assets.TwitterIcon = this.oauth.photos[0].value;
            }
        },

        isLogin: function () {
            return (ns.OAUTH) ? true : false;
        },

        getIconName: function () { return "TwitterIcon"; }
    });

})(game);

/*

Object
    _json: Object
        contributors_enabled: false
        created_at: "Fri Sep 18 09:52:25 +0000 2009"
        default_profile: true
        default_profile_image: false
        description: "C++好き。映画好き。漫画好き。↵ゲーム好き。アニメ好き。面白いもの好き。↵↵Sass好き。↵ツイートを鳥分けるWEBサービス作ってみた http://t.co/ulGxN2fRsS - new!"
        entities: Object
        favourites_count: 92
        follow_request_sent: false
        followers_count: 142
        following: false
        friends_count: 94
        geo_enabled: false
        id: 75244126
        id_str: "75244126"
        is_translator: false
        lang: "ja"
        listed_count: 8
        location: "福岡"
        name: "岡山智弘"
        notifications: false
        profile_background_color: "C0DEED"
        profile_background_image_url: "http://a0.twimg.com/images/themes/theme1/bg.png"
        profile_background_image_url_https: "https://si0.twimg.com/images/themes/theme1/bg.png"
        profile_background_tile: false
        profile_image_url: "http://a0.twimg.com/profile_images/1019142336/2009y04m17d_191246234_normal.jpg"
        profile_image_url_https: "https://si0.twimg.com/profile_images/1019142336/2009y04m17d_191246234_normal.jpg"
        profile_link_color: "0084B4"
        profile_sidebar_border_color: "C0DEED"
        profile_sidebar_fill_color: "DDEEF6"
        profile_text_color: "333333"
        profile_use_background_image: true
        protected: false
        screen_name: "omatoro"
        status: Object
        statuses_count: 3202
        time_zone: "Tokyo"
        url: "http://t.co/9Z9sc8Mgoq"
        utc_offset: 32400
        verified: false

    _raw: "{"id":75244126,"id_str":"75244126","name":"\u5ca1\u5c71\u667a\u5f18","screen_name":"omatoro","location":"\u798f\u5ca1","description":"C++\u597d\u304d\u3002\u6620\u753b\u597d\u304d\u3002\u6f2b\u753b\u597d\u304d\u3002\n\u30b2\u30fc\u30e0\u597d\u304d\u3002\u30a2\u30cb\u30e1\u597d\u304d\u3002\u9762\u767d\u3044\u3082\u306e\u597d\u304d\u3002\n\nSass\u597d\u304d\u3002\n\u30c4\u30a4\u30fc\u30c8\u3092\u9ce5\u5206\u3051\u308bWEB\u30b5\u30fc\u30d3\u30b9\u4f5c\u3063\u3066\u307f\u305f http:\/\/t.co\/ulGxN2fRsS - new!","url":"http:\/\/t.co\/9Z9sc8Mgoq","entities":{"url":{"urls":[{"url":"http:\/\/t.co\/9Z9sc8Mgoq","expanded_url":"http:\/\/testcording.com\/","display_url":"testcording.com","indices":[0,22]}]},"description":{"urls":[{"url":"http:\/\/t.co\/ulGxN2fRsS","expanded_url":"http:\/\/toriwake.testcording.com","display_url":"toriwake.testcording.com","indices":[69,91]}]}},"protected":false,"followers_count":142,"friends_count":94,"listed_count":8,"created_at":"Fri Sep 18 09:52:25 +0000 2009","favourites_count":92,"utc_offset":32400,"time_zone":"Tokyo","geo_enabled":false,"verified":false,"statuses_count":3202,"lang":"ja","status":{"created_at":"Sat Jun 29 08:37:14 +0000 2013","id":350895723795062785,"id_str":"350895723795062785","text":"node.js + passport \u3067Twitter\u306eOauth\u8a8d\u8a3c\u3092\u3057\u305f\u3044\u65b9\u306f\u53c2\u8003\u306b\u3057\u3066\u307f\u3066\u304f\u3060\u3055\u3044\u3002\nhttps:\/\/t.co\/IG65U5EArT\n#twitterapi #oauth #node #passport","source":"web","truncated":false,"in_reply_to_status_id":null,"in_reply_to_status_id_str":null,"in_reply_to_user_id":null,"in_reply_to_user_id_str":null,"in_reply_to_screen_name":null,"geo":null,"coordinates":null,"place":null,"contributors":null,"retweet_count":0,"favorite_count":1,"entities":{"hashtags":[{"text":"twitterapi","indices":[78,89]},{"text":"oauth","indices":[90,96]},{"text":"node","indices":[97,102]},{"text":"passport","indices":[103,112]}],"symbols":[],"urls":[{"url":"https:\/\/t.co\/IG65U5EArT","expanded_url":"https:\/\/github.com\/omatoro\/node_oauth_twitter_sample","display_url":"github.com\/omatoro\/node_o\u2026","indices":[54,77]}],"user_mentions":[]},"favorited":false,"retweeted":false,"possibly_sensitive":false,"lang":"ja"},"contributors_enabled":false,"is_translator":false,"profile_background_color":"C0DEED","profile_background_image_url":"http:\/\/a0.twimg.com\/images\/themes\/theme1\/bg.png","profile_background_image_url_https":"https:\/\/si0.twimg.com\/images\/themes\/theme1\/bg.png","profile_background_tile":false,"profile_image_url":"http:\/\/a0.twimg.com\/profile_images\/1019142336\/2009y04m17d_191246234_normal.jpg","profile_image_url_https":"https:\/\/si0.twimg.com\/profile_images\/1019142336\/2009y04m17d_191246234_normal.jpg","profile_link_color":"0084B4","profile_sidebar_border_color":"C0DEED","profile_sidebar_fill_color":"DDEEF6","profile_text_color":"333333","profile_use_background_image":true,"default_profile":true,"default_profile_image":false,"following":false,"follow_request_sent":false,"notifications":false}"
    displayName: "岡山智弘"
    id: 75244126
    photos: Array[1]
        0: Object
            value: "https://si0.twimg.com/profile_images/1019142336/2009y04m17d_191246234_normal.jpg"
    provider: "twitter"
    twitter_token: ""
    twitter_token_secret: ""
    username: "omatoro"
    __proto__: Object

*/