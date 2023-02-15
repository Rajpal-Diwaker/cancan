
var mailTemplate = {
	from: "cancan<test.techugo@gmail.com>",
	subject:"cancan Forgot Password",
	text:"Hi user,<br><br>Please follow the link to recover the password.<a target='_blank' href='http://13.126.131.184:9898/user/verifyForgotLink?email={{email}}&forgot_token={{forgot_token}}'>Recover Password</a><br> If it does not work please copy and past link on browser<br><br>Thanks,<br>Team cancan."
}

var mailTemplateForAdmin = {
	from: "cancan<test.techugo@gmail.com>",
	subject:"cancan Forgot Password",
	text:"Hi user,<br><br>Please follow the link to recover the password.<a target='_blank' href='http://13.126.131.184:9898/admin/verifyForgotLink?email={{email}}&forgot_token={{forgot_token}}'>Recover Password</a><br> If it does not work please copy and past link on browser<br><br>Thanks,<br>Team cancan."
}
module.exports ={
	mailTemplate : mailTemplate,
	mailTemplateForAdmin: mailTemplateForAdmin
}