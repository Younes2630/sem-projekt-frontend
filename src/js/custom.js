$( function() {
    $( "#departure" ).datepicker();
    $( "#return" ).datepicker();
} );

$('#login_popup').on( 'click', function(){
	$('._login_sec').toggle();
});

$('#login_form').on( 'click', function(){
	$('#sign_up').hide();
	$('#login').show();
});

$('#singup_form').on( 'click', function(){
	$('#sign_up').show();
	$('#login').hide();
});

$('.search_btn').on( 'click', function(){
	$('._hero_content').hide();
	$('._listings').show();
});

$('#get_listings').on( 'click', function(){
	$('._hero_content').hide();
	$('._listings').show();
});

$('.navbar-brand').on( 'click', function(e){
	e.preventDefault();
	$('._hero_content').show();
	$('._listings').hide();
});
