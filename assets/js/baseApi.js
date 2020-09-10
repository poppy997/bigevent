$.ajaxPrefilter(function(options){
    options.url='http://ajax.found.itheima.net'+options.url
    console.log(options.url);
})