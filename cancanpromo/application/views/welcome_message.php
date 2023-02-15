<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>CanCan</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="<?= base_url(); ?>assets/css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="<?= base_url(); ?>assets/css/style.css" rel="stylesheet" type="text/css">
	<link href="<?= base_url(); ?>assets/css/media.css" rel="stylesheet" type="text/css">
	<link href="<?= base_url(); ?>assets/css/font-awesome.min.css" media="screen" rel="stylesheet" type="text/css">
	<script src="<?= base_url(); ?>assets/js/jquery-2.1.1.js"></script>
	<script src="<?= base_url(); ?>assets/js/bootstrap.js"></script>
	<script src="<?= base_url(); ?>assets/js/script.js"></script>
</head>
<style>
label.error{
	position: relative;
    left: -140px;
    top: 10px;
	color:red;
}
.msg{
	color: rgb(24, 207, 24);
    font-size: 18px;
}
</style>
<body>
	<div class="wrapper" id="wrapper">

		<!-- header section start here---------->
		<div class="container headerwrap">
			<nav class="navbar navbar-default navbar-fixed-top">
				<div class="container">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-control="navbar">
							<span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
						</button>
						<a href="#" class="navbar-brandd">
							<img src="<?= base_url(); ?>assets/img/logo.png">
						</a>
					</div>
					<div id="navbar" class="navbar-collapse collapse">
						<ul class="nav navbar-nav navbar-right">
							<li><a href="#">Home</a></li>
							<li><a href="#service">Services</a></li>
							<li><a href="#about"> About Us</a></li>
							<li><a href="#contact"><button type="button">Contact Us</button></a></li>
						</ul>

					</div>
				</div>	
			</nav>
		</div>
		<div class="banner_wrap clearfix">
			<div class="header_img">
				<div class="left_canvas">
					<img src="<?= base_url(); ?>assets\img\canvas_2.png">
				</div>
				<div class="right_canvas">
					<img src="<?= base_url(); ?>assets\img\canvas_3.png">
				</div>
			</div>
			<div class="container">
				<div class="row">
					<div class="col-xs-12 col-sm-12 col-md-6">
						<div class="banner_upper_text">
							<div class="banner_text">
								<span>Explore & Get</span>
								<h3>Custome Management<br> of Kandoras</h3>
							</div>
							<div class="banner_para">
								<p>Engage your customers and co-worker through instant,</p>
						<p>presence-based click-to-chat feature.</p>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-6">
						<div class="phone_screen">
							<img class="img-responsive" src="<?= base_url(); ?>assets\img\mobil.png">
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- header section ends here----------->
		<div id="service" class="service_wrap">
			<div class="service_img">
				<div class="container">
					<div class="service_text text-center">
						<h1>Services</h1>
						<div class="service_para" style="margin-top: 50px;">
							<p>Engage your customers and co-worker through instant,</p>
						<p>presence-based click-to-chat feature.</p>
						</div>
					</div>
				</div>
				<div class="container">
					<div class="circle_img_wrap">
						<div class="row">
							<div class="col-xs-12 col-sm-4 col-md-4">
								<div class="services_box_1">
									<div class="services_img text-center">
										<img src="<?= base_url(); ?>assets/img/circle_1.png">
									</div>
									<h3 class="service_head">Get Scanned</h3>
								</div>
							</div>
							<div class="col-xs-12 col-sm-4 col-md-4">
								<div class="services_box_1">
									<div class="services_img text-center">
										<img src="<?= base_url(); ?>assets/img/circle_2.png">
									</div>
									<h3 class="service_head">Get AI <br>Measured</h3>
								</div>
							</div>
							<div class="col-xs-12 col-sm-4 col-md-4">
								<div class="services_box_1">
									<div class="services_img text-center">
										<img src="<?= base_url(); ?>assets/img/circle_3.png">
									</div>
									<h3 class="service_head">Get Your<br>Kandora</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
		<!-----services part start here---------->
		<!------------about us page start here-------------->
		<div class="about_wrap">
		<div class="container">
			<div id="about" class="about_us_wrap clearfix">
				<div class="about_us_text text-center">
					<h1>About Us</h1>
					<div class="about_us_para" style="margin-top: 50px;">
						<p>Engage your customers and co-worker through instant,</p>
						<p>presence-based click-to-chat feature.</p>
					</div>
				</div>
				<div class="about_kandors_wrap">
					<div class="side_img">
						<img src="<?= base_url(); ?>assets/img/canvas_2.png">
					</div>
					<div class="row first_image" style="margin-top: 40px;">
						<div class="col-xs-12 col-sm-4 col-md-4">
							<div class="kandora_image_box">
								<div class="kandora_image_1">
									<img class="img-responsive image" src="<?= base_url(); ?>assets/img/Layer1.png">
									<div class="middle">
										<div class="text"><img class="img-responsive" src="<?= base_url(); ?>assets\img\eye_icon.png"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-sm-4 col-md-4">
							<div class="kandora_image_box">
								<div class="kandora_image_1">
									<img class="img-responsive image" src="<?= base_url(); ?>assets/img/Layer2.png">
									<div class="middle">
										<div class="text"><img class="img-responsive" src="<?= base_url(); ?>assets\img\eye_icon.png"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-sm-4 col-md-4">
							<div class="kandora_image_box">
								<div class="kandora_image_1">
									<img class="img-responsive image" src="<?= base_url(); ?>assets/img/Layer3.png">
									<div class="middle">
										<div class="text"><img class="img-responsive" src="<?= base_url(); ?>assets\img\eye_icon.png"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row second_image" style="margin-top: 40px;">		
						<div class="col-xs-12 col-sm-4 col-md-4">
							<div class="kandora_image_box">
								<div class="kandora_image_1">
									<img class="img-responsive image" src="<?= base_url(); ?>assets/img/Layer4.png">
									<div class="middle">
										<div class="text"><img class="img-responsive" src="<?= base_url(); ?>assets\img\eye_icon.png"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-sm-4 col-md-4">
							<div class="kandora_image_box">
								<div class="kandora_image_1">
									<img class="img-responsive image" src="<?= base_url(); ?>assets/img/Layer5.png">
									<div class="middle">
										<div class="text"><img class="img-responsive" src="<?= base_url(); ?>assets\img\eye_icon.png"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-sm-4 col-md-4">
							<div class="kandora_image_box">
								<div class="kandora_image_1">
									<img class="img-responsive image" src="<?= base_url(); ?>assets/img/Layer6.png">
									<div class="middle">
										<div class="text"><img class="img-responsive" src="<?= base_url(); ?>assets\img\eye_icon.png"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
		<!------------about us page ends here-------------->
		<!-------------------contact us page start here------------>
		<div class="container" id="contact">
			<div class="contact_us_wrap">
				<div class="row">
					<div class="col-xs-12 col-sm-6 col-md-6">
						<div class="contact_us_text text-center">
							<h1>Contact Us</h1>
							<div class="contact_para" style="margin-top: 70px;">
								<p>Engage your customers and co-worker through instant,presence-based click-to-chat feature.</p>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-6">
					<form action ="" method="POST" id="myForm"  enctype='multipart/form-data'>
						<div class="contact_form text-center">							
							<div class="form-group">
								<input class="track" type="text" name="name" id="name" placeholder=" Full Name" required>
							</div>
							<div class="form-group">
								<input class="track" type="text" name="email" placeholder=" Email" required>
							</div>
							<div class="form-group">
								<input class="track" type="text" name="msg" placeholder="Write Something" required>
							</div>
						</div>
						<div class="submit_btn">
							<input type="submit" value="Submit">
							<div id ='message' class="msg"></div>
						</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<!-------------------contact us page ends here------------>
		<!-------download section start here----------->
		<div class="download_wrap">
		<div class="download-rw">
			<div class="phn_img"></div>
			<div class="container">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-7">
					<div class="download-content">
						<span>Download App Now</span>
						<p>Engage your customers and co-worker through instant,presence-based click-to-chat feature.</p>
					</div>
					<div class="download_link">
						<a href="#">
							<img src="<?= base_url() ;?>assets/img/app_store.png">
						</a>
						<a href="#">
							<img src="<?= base_url() ;?>assets/img/google_play.png">
						</a>
					</div>
				</div>
			</div>
		</div>
		</div>
		</div>
		<!-- -----download section ends here--------- -->
		<!-----------footer section start here------------------>
		<div class="footer_wrap">
			<div class="footer-rw">
				<div class="footer_upper">
					<div class="text-rw">
						<span>
							<a href="#">Copyright©.All rights reserved</a>
						</span>
					</div>
					<div class="text-rw">
						<span>
							<a href="#">Terms & Conditions</a>
						</span>
					</div>
					<div class="text-rw">
						<span>
							<a href="#">Privacy Policy</a>
						</span>
					</div>
					<div class="text-rw">
						<span>
							<a href="#">Cookie Policy</a>
						</span>
					</div>
				</div>
				<div class="footer_lower">
					<div class="row">
						<div class="text-rw">
							<span class="social_icon">
								<a href="#">
									<i class="fa fa-twitter" aria-hidden="true"></i>
								</a>
								<span>Twitter</span>
							</span>
						</div>
						<div class="text-rw">
							<span class="social_icon">
								<a href="#">
									<i class="fa fa-facebook" aria-hidden="true"></i>
								</a>
								<span>Facebook</span>
							</span>
						</div>   
						<div class="text-rw">
							<span class="social_icon">
								<a href="#">
									<i class="fa fa-google-plus" aria-hidden="true"></i>
								</a>
								<span>google</span>
							</span>
						</div>
						<div class="text-rw">
							<span class="social_icon">
								<a href="#">
									<i class="fa fa-pinterest-p" aria-hidden="true"></i>
								</a>
								<span>Pinterest</span>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-----------footer section ends here------------------>
	</div>
</body>
</html>


<script>
		$(document).ready(function () {
			$(window).scroll(function () {
				var scroll = $(window).scrollTop();
				if (scroll > 100) {
					$(".navbar-fixed-top").css({"background":"#fff","box-shadow":"2px 8px 10px -9px rgba(0,0,0,0.75)"});
					$(".navbar-nav a").css("color", "black");
				}
				else {
					$(".navbar-fixed-top").css({"background":"transparent","box-shadow":"0px 0px 0px 0px rgba(0,0,0,0"});
					$(".navbar-nav a").css("color", "#333");

				}
			});
		});
		</script>
<script src= "https://cdn.jsdelivr.net/jquery.validation/1.15.0/jquery.validate.min.js"></script>
<script>
	$.validator.addMethod("myusername", function(value,element) {
    		return this.optional(element) ||
          /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value);
			}, "Email format is incorrect.");
	$.validator.addMethod("noSpace", function(value, element) { 
		  return value == '' || value.trim().length != 0;  
		}, "No spaces allowed !! please don't leave it empty.");
	$.validator.addMethod("lettersonly", function(value, element) {
		 return this.optional(element) || /^[a-z\s]+$/i.test(value);},"Please enter letters only."
	  );
	$('#myForm input').bind("cut copy paste",function(e) {
	e.preventDefault();
	});
	</script>	
	<script>
$(document).ready(function() {


    $("#myForm").validate({
        rules: {
            name:{
              required: true,
			  lettersonly:true,
              maxlength: 50,
			  noSpace:true
            }, 
            email: {
                required: true,
				myusername: true,
                noSpace:true
            },
            msg: {
                required: true,
	            }
        },
           messages: {
            name: {
              required:"Please enter your name",
              maxlength:"Name should be less than 50 characters"
              },            
            email: {
                required: "Please enter Email ID",
               },
            msg: {
                required: "Please write something",
			     }
          },
		submitHandler: function(form) {
			
		 var formData = document.getElementById("myForm");
	    var Data = new FormData(formData);
     
         $.ajax({
           type: "POST",
           url: "<?php echo base_url('index.php/welcome/contact'); ?>",
           data: Data,
		   cache: false,
           contentType: false,
           processData: false,
           success: function(data)
           { 
			   $("#myForm")[0].reset();
		       if(data == 1){ $("#message" ).text( "Thanks for contacting us !!" ).css('color','#18cf18').show().fadeOut( 4000 );return false;}
               else{ $("#message" ).text( "Please Try Again" ).css('color','#dc1036').show().fadeOut( 4000 );return false;}
           }
         });
		}
	});
  

    $("#name").keypress(function(event){
        var inputValue = event.which;
        // allow letters and whitespaces only.
        if(!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0)) { 
            event.preventDefault(); 
        }
    });
});
</script>