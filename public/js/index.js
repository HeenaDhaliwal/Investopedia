$(document).ready(function () {

	//  eye
	$(".fa").mouseenter(function () {
		$(".pswd").prop("type", "text");
		$(".fa").removeClass("fa-eye").addClass("fa-eye-slash");
	});

	$(".fa").mouseleave(function () {
		$(".pswd").attr("type", "password");
		$(".fa").removeClass("fa-eye-slash").addClass("fa-eye");
	});

	//  validations

	// login validations
	$("#emailLog").blur(function () {
		var exp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		var email = $("#emailLog").val();

		if (exp.test(email) == true) {
			$(this).css("border", "2px solid #456b55");
		} else {
			$(this).css("border", "2px solid red");
		}
	});

	$("#pswdLog").blur(function () {
		var pass = $("#pswdLog").val();
		var r = /(?=^.{8}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
		if (r.test(pass) == true) {
			$(this).css("border", "2px solid #456b55");
		} else {
			$(this).css("border", "2px solid red");
		}
	});

	// signup validations 
	$(".txtEmailSign").blur(function () {
		var exp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		var email = $(".txtEmailSign").val();

		if (exp.test(email) == true) {
			$(this).css("border", "2px solid #456b55");
		} else {
			$(this).css("border", "2px solid red");
		}
	});

	$(".txtPswdSign").blur(function () {
		var pass = $(".txtPswdSign").val();
		var r = /(?=^.{8}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
		if (r.test(pass) == true) {
			$(this).css("border", "2px solid #456b55");
		} else {
			$(this).css("border", "2px solid red");
		}
	});
	$(".txtMobSign").blur(function () {
		var pass = $(".txtMobSign").val();
		var r = /^[6-9]{1}[0-9]{9}$/;
		if (r.test(pass) == true) {
			$(this).css("border", "2px solid #456b55");
		} else {
			$(this).css("border", "2px solid red");
		}
	});

	$(".txtSel").blur(function () {
		var sel = $(".txtSel").val();
		if (sel == 'select') {
			$(this).css("border", "2px solid red");
		}
		else {
			$(this).css("border", "2px solid #456b55");
		}
	})
	$(".txtEmailAdmin").blur(function () {
		var exp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		var email = $(".txtEmailLog").val();

		if (exp.test(email) == true) {
			$(this).css("border", "2px solid #456b55");
		} else {
			$(this).css("border", "2px solid red");
		}
	});

	$(".txtPswdAdmin").blur(function () {
		var pass = $(".txtPswdLog").val();
		var r = /(?=^.{8}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
		if (r.test(pass) == true) {
			$(this).css("border", "2px solid #456b55");
		} else {
			$(this).css("border", "2px solid red");
		}
	});

	// ajax for check email
	$("#txtEmail").blur(function () {
		var myEmail = $("#txtEmail").val();
		var obj = {
			type: "get",
			url: "/ajax-chk-user",
			data: {
				emaill: myEmail,
			}
		}
		$.ajax(obj).done(function (myResponse) {
			// alert("hello");
			$("#inputRes").html(myResponse);
		}).fail(function (err) {
			alert(err.toString());
		});

	});

	//signup ajax
	$("#btnSignup").click(function () {
		var email = $("#txtEmail").val();
		var pswd = $("#txtPswd").val();
		var mob = $("#txtMob").val();
		var Type = "";
		if ($("#Investor").prop("selected") == true) {
			Type = "Investor";
		}
		else if ($("#Entrepreneur").prop("selected") == true) {
			Type = "Entrepreneur";
		}
		var obj = {
			type: "post",
			url: "/db-Signup",
			data: {
				emaill: email,
				pswdd: pswd,
				mobb: mob,
				typee: Type,
			}
		}
		$.ajax(obj).done(function (msg) {
			$("#submitRes").html(msg);
		}).fail(function (msgerr) {
			$("#submitRes").html(msgerr);
		})
	})

	// login ajax
	$("#btnLogin").click(function () {
		var email = $("#emailLog").val();
		var pswd = $("#pswdLog").val();

		var obj = {
			type: "post",
			url: "/db-login",
			data: {
				emaill: email,
				pswdd: pswd,
			}
		}
		$.ajax(obj).done(function (msg) {
			// alert(myResponse);

			//login and create with same id whose login is active
			localStorage.setItem("activeUser",email);

			if (msg.trim() == "Investor")
				window.location.href = "dash-investor.html";
			else if (msg.trim() == "Entrepreneur")
				window.location.href = "dash-entrepreneur.html"; 
			else
				$("#loginRes").html(msg);
		}).fail(function (msgerr) {
			$("#loginRes").html(msgerr);
		});
	})
	
	// $(document).ajaxStart(function(){
	// 	$("#submitRes").css("display","block");
	// })
	// $(document).ajaxStop(function(){
	// 	$("#submitRes").css("display","none");
	// })

});
