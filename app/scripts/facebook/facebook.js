define(["jquery","backbone","postal","controllers/editor","controllers/collage","reveal","settings","easyfb"],

    function($,Backbone,postal,EditorController,CollageController, easyfb, settings){
        return {
            run : function(){
                $(document).ready(function(){

                    //Facebook settup
                    $('#fb-root').easyfb().fbinit(settings.easyfb);


                    $('body').bind('user', function(event, user){

                        console.log(  user.name +','+ user.id  );

                    });

                    $('body').bind('access_token', function(event, access_token){
                        console.log(access_token);
                        var accessToken = access_token;

                        $('body').bind('collage.ready', function(event, collageUrl){
                            console.log("collage : ",collageUrl);

                            $('button.facebook').off("click");
                            $('button.facebook').on("click", function(){

                                var message = "test publish";

                                console.log(message, accessToken, collageUrl);
                                FB.api('me/photos', 'post', {
                                        url:collageUrl,
                                        message:message,
                                        access_token:accessToken
                                    }, function(response) {
                                        console.log("result : ", response);

                                    }
                                );
                            });
                        });

                    });




                    // register the facebook share link   not used yet
                    $("a.share.facebook").on("click", function(){
                        var sharer = "https://www.facebook.com/sharer/sharer.php?u=";
                        window.open(sharer + location.href, 'sharer', 'width=626,height=436');
                    });




                });
            }
        };
    }
);