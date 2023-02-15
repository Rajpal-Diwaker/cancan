<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */


	public function __construct()
	{
	parent::__construct();
	$this->load->model('Contact_model');

	}

	public function index()
	{
		$this->load->view('welcome_message');
	}

	public function contact()
	{
			$name= $this->input->post('name');
			$email= $this->input->post('email');
			$msg= $this->input->post('msg');
			
			$subject = "Contact Here";
			$message = '<p>Hello,<br><br>Here are the Details to contact<br></br></br>
			Name : '.$name.'</br></br>
			Email : '.$email.'</br> </br>
			Message: '.$msg.'</br> </br>
			
			<br><br><br>Thanks and Regards,<br><p>'.$name.'</p>';
			$body =
			'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
			<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<meta http-equiv="Content-Type" content="text/html; charset='.strtolower(config_item('charset')).'" />
				<title>'.html_escape($subject).'</title>
				<style type="text/css">
					body {
						font-family: Arial, Verdana, Helvetica, sans-serif;
						font-size: 16px;
					}
				</style>
			</head>
			<body>
			'.$message.'
			</body>
			</html>';
			
			$to_email  = TO_EMAIL; 
		
			$this->load->library('email');
			$result = $this->email
			->from($email)
			->to($to_email)
			->subject($subject);
			$this->email->message($body);
			$this->email->send();

			if(!$result)
			{
				echo "Failure";

			}

			$insertData= array(
				"firstName"=>$name?$name:'',
				"email"=>$email?$email:'',
				"notes"=>$msg?$msg:''
			);
			$response = $this->Contact_model->insert_data($insertData);
			echo $response;
	}
}
