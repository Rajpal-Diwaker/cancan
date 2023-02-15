<?php
class Contact_model extends CI_Model
{

    // Method to Insert contact form data from get in touch
    function insert_data($data){
	//	print_r($data);die;
        $this->db->insert('guestContactData',$data);
        return 1;
    }

}
?>